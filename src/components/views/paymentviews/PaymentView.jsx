import { AddressForm } from "./components/forms/AddressForm";
import {
  Button,
  CircularProgress,
  Grid,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import { Navigate } from "react-router-dom";
import { PaymentForm } from "./components/forms/PaymentForm";
import { ReviewItems } from "./components/views/ReviewItems";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useAuthState } from "../../../contexts/AuthContext";
import {
  useCollection,
  useCollectionData,
} from "react-firebase-hooks/firestore";
import { useFirebase } from "../../../contexts/FirebaseContext";
import { useStyle } from "./components/Style";
import { v4 as uuidv4 } from "uuid";
import React, { useState } from "react";
import addressPaymentForm from "./components/formSchemas/AddrPaymentForm";
import initialAddrPayment from "./components/formSchemas/initialAddrPayment";
import validationSchema from "./components/formSchemas/validationSchema";

const steps = ["Shipping", "Billing", "Review Order"];
const { formId, formField } = addressPaymentForm;

function stepContent(step, cartItems, cartCost, orderProcessingDelay) {
  switch (step) {
    case 0:
      return <AddressForm formField={formField} />;
    case 1:
      return <PaymentForm formField={formField} />;
    case 2:
      return (
        <ReviewItems
          items={cartItems}
          cartCost={cartCost}
          orderProcessingDelay={orderProcessingDelay}
        />
      );
    default:
      return <h3>Not Found</h3>;
  }
}

export function PaymentView(props) {
  const { formValues = "empty" } = props || {};
  const { shipping } = formValues;
  const { firestore: db } = useFirebase();
  const { user } = useAuthState();
  const [billingSnapshot, billingLoading] = useCollection(
    query(collection(db, "billing"), where("userId", "==", user.uid))
  );
  const billingData = billingSnapshot
    ? billingSnapshot?.docs[0]?.data()
    : undefined;
  const [shippingSnapshot, shippingLoading] = useCollection(
    query(collection(db, "shipping"), where("userId", "==", user.uid))
  );
  const shippingData = shippingSnapshot
    ? shippingSnapshot?.docs[0]?.data()
    : undefined;
  const [value] = useCollection(
    query(collection(db, "cart"), where("userId", "==", user.uid))
  );
  const _items =
    value?.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    }) ?? [];
  const _cost = _items
    .reduce(
      (partialSum, item) =>
        partialSum + Number(item.price) * Number(item.quantity),
      0
    )
    .toFixed(2);
  const orderProcessingDelay = _items.reduce((p, v) => {
    return p > Number(v.itemProcessingDelay)
      ? p
      : Number(v.itemProcessingDelay);
  }, 0);

  const getDeliveryTime = (deliveryOption) => {
    switch (deliveryOption) {
      case 0:
        return 0;
      case 1:
        return 1;
      case 2:
        return 2;
      case 7:
        return 7;
    }
  };

  const classes = useStyle();
  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = validationSchema[activeStep];
  const isLastStep = activeStep === steps.length - 1;

  async function submitForm(values, actions) {
    // adds a new order to to the userId with a generated ID
    const deliveryDate = new Date();
    deliveryDate.setDate(
      deliveryDate.getDate() +
        Number(getDeliveryTime(values.shipping)) +
        Number(orderProcessingDelay) ?? 0
    );
    const _order = {
      userID: user.uid,
      orderDate: new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      arrivalDate: deliveryDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      cost: _cost,
      items: _items?.map((item) => ({
        filters: [...item.filters],
        quantity: item.quantity,
        name: item.name,
        imageRef: item.imageRef,
        ID: item.imageRef,
      })),
    };
    const _shippingData = {
      userId: user.uid,
      first: values.first,
      last: values.last,
      address: values.address,
      extra: values.extra,
      city: values.city,
      province: values.province,
      country: values.country,
      postal: values.postal,
      phone: values.phone,
    };

    const _billingData = {
      userId: user.uid,
      first: values.cardHolderFirst,
      last: values.cardHolderLast,
      card: values.card,
      expiration: values.expiration,
      ccv: values.ccv,
      address: values.useSameAddress ? values.address : values.billingAddress,
      extra: values.useSameAddress ? values.extra : values.billingExtra,
      city: values.useSameAddress ? values.city : values.billingCity,
      province: values.useSameAddress
        ? values.province
        : values.billingProvince,
      country: values.useSameAddress ? values.country : values.billingCountry,
      postal: values.useSameAddress ? values.postal : values.billingPostal,
    };
    await addDoc(collection(db, "orders"), _order);
    if (!shippingSnapshot?.docs[0]?.id) {
      await addDoc(collection(db, "shipping"), _shippingData);
    } else {
      await setDoc(
        doc(db, "shipping", shippingSnapshot.docs[0].id),
        _shippingData
      );
    }
    if (!billingSnapshot?.docs[0]?.id) {
      await addDoc(collection(db, "billing"), _billingData);
    } else {
      await setDoc(
        doc(db, "billing", billingSnapshot.docs[0].id),
        _billingData
      );
    }
    _items?.forEach((item) => deleteDoc(doc(db, "cart", item.id)));
    actions.setSubmitting(false);
    setActiveStep(activeStep + 1);
  }

  function handleSubmit(values, actions) {
    if (isLastStep) {
      submitForm(values, actions);
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false); // not submitted yet since it's not the last step
    }
  }

  function handleBacking() {
    // allows the user to go back to the previous step of the form
    setActiveStep(activeStep - 1);
  }

  return (
    <div align="center">
      <React.Fragment>
        <Typography variant="h5">Checkout</Typography>
        <Stepper activeStep={activeStep} className={classes.stepper}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <React.Fragment>
          {activeStep === steps.length ? (
            <Navigate to="/order-confirmation" />
          ) : (
            !billingLoading &&
            !shippingLoading && (
              <Formik
                initialValues={{
                  first: shippingData?.first ?? "",
                  last: shippingData?.last ?? "",
                  address: shippingData?.address ?? "",
                  extra: shippingData?.extra ?? "",
                  city: shippingData?.city ?? "",
                  province: shippingData?.province ?? "",
                  country: shippingData?.country ?? "",
                  postal: shippingData?.postal ?? "",
                  phone: shippingData?.phone ?? "",
                  // useSameAddress: false,
                  cardHolderFirst: billingData?.first ?? "",
                  cardHolderLast: billingData?.last ?? "",
                  card: billingData?.card ?? "",
                  expiration: billingData?.expiration ?? "",
                  ccv: billingData?.ccv ?? "",
                  billingAddress: billingData?.address ?? "",
                  billingExtra: billingData?.extra ?? "",
                  billingCity: billingData?.city ?? "",
                  billingProvince: billingData?.province ?? "",
                  billingCountry: billingData?.country ?? "",
                  billingPostal: billingData?.postal ?? "",
                  shipping: 7,
                }}
                validationSchema={currentValidationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form id={formId}>
                    {stepContent(
                      activeStep,
                      _items,
                      _cost,
                      orderProcessingDelay
                    )}
                    <div className={classes.wrapper}>
                      <Grid container>
                        <Grid item xs={6}>
                          {activeStep !== 0 && (
                            <Button
                              onClick={handleBacking}
                              className={classes.button}
                            >
                              Previous
                            </Button>
                          )}
                        </Grid>
                        <Grid item xs={6}>
                          <div className={classes.wrapper}>
                            <Button
                              disabled={isSubmitting}
                              type="submit"
                              variant="contained"
                              color="primary"
                              className={classes.button}
                            >
                              {isLastStep ? "Place order" : "Next"}
                            </Button>
                            {isSubmitting && (
                              <CircularProgress
                                size={30}
                                className={classes.buttonProgress}
                              />
                            )}
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  </Form>
                )}
              </Formik>
            )
          )}
        </React.Fragment>
      </React.Fragment>
    </div>
  );
}
