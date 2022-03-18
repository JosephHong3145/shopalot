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
import { OrderConfirmationView } from "../OrderConfirmationView";
import { PaymentForm } from "./components/forms/PaymentForm";
import { ReviewItems } from "./components/views/ReviewItems";
import { collection, doc, query, setDoc, where } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { useAuthState } from "../../../contexts/AuthContext";
import { useFirebase } from "../../../contexts/FirebaseContext";
import { useStyle } from "./components/Style";
import React, { useState } from "react";
import addressPaymentForm from "./components/formSchemas/AddrPaymentForm";
import initialAddrPayment from "./components/formSchemas/initialAddrPayment";
import validationSchema from "./components/formSchemas/validationSchema";

const steps = ["Shipping", "Billing", "Review Order"];
const { formId, formField } = addressPaymentForm;

function stepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm formField={formField} />;
    case 1:
      return <PaymentForm formField={formField} />;
    case 2:
      return <ReviewItems />;
    default:
      return <h3>Not Found</h3>;
  }
}

/* function getDate(separator = "") {
  const newDate = new Date();
  const date = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();

  return `${year}${separator}${
    month < 10 ? `0${month}` : `${month}`
  }${separator}${date}`;
}

function getDeliveryDate(separator = "") {
  const now = getDate();
  return now.setDate(now.getDate() + 14); // 14 days = 2 weeks = delivery date
} */

export function PaymentView() {
  const classes = useStyle();
  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = validationSchema[activeStep];
  const isLastStep = activeStep === steps.length - 1;

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function submitForm(values, actions) {
    await sleep(1000);
    // adds a new order to to the userId with a generated ID
    setActiveStep(activeStep + 1);
    actions.setSubmitting(true);
  }

  function handleSubmit(values, actions) {
    if (isLastStep) {
      submitForm(values, actions);
    } else {
      setActiveStep(activeStep + 1);
      if (activeStep === 0) {
        useFirebase
          .collection("shipping")
          .doc(doc.id)
          .set({
            [formField]: { formField },
            category: values.category.map((c) => c.value),
          });
      } else if (activeStep === 1) {
        useFirebase
          .collection("billing")
          .doc(doc.id)
          .set({
            [formField]: { formField },
            category: values.category.map((c) => c.value),
          });
      }
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
      <Typography variant="h5">Checkout</Typography>
      <Stepper activeStep={activeStep} className={classes.stepper}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <OrderConfirmationView />
        ) : (
          <Formik
            initialValues={initialAddrPayment}
            validationSchema={currentValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form id={formId}>
                {stepContent(activeStep)}
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
        )}
      </div>
    </div>
  );
}
