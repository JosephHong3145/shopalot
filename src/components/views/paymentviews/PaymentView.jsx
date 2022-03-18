import { AddressInfo } from "./components/AddressForm";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
  createTheme,
  makeStyles,
  stepClasses,
} from "@mui/material";
import { Form, Formik } from "formik";
import { PaymentInfo, ReviewItems,  } from "./components";
import { useStyle } from "./components/Style";
import React, { useState } from "react";

const steps = ["Shipping Address", "Payment Details", "Review Order"];
const { formId, formField } = template;

function stepContent(step) {
  switch (step) {
    case 0:
      return <AddressInfo formField={formField} />;
    case 1:
      return <PaymentInfo formField={formField} />;
    case 2:
      return <ReviewItems />;
    default:
      return <h3>Not Found</h3>;
  }
}

export function PaymentView() {
  const classes = useStyle();

  const [activeStep, setActiveStep] = useState(0);
  const isLastStep = activeStep === stepClasses.length - 1;

  async function submitForm(values, actions) {
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
    <React.Fragment>
      <Typography>Checkout</Typography>
      <Stepper activeStep={activeStep} className={classes.stepper}>
        {stepClasses.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <React.Fragment>
        {activeStep === steps.length ? (
          <CheckoutSuccess />
        ) : (
          <Formik>
            {({ isSubmitting }) => (
              <Form id={formId}>
                {stepContent(activeStep)}
                <div className={classes.button}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBacking} className={classes.button}>
                      Previous
                    </Button>
                  )}
                  <div className={classes.wrapper}>
                    <Button
                      disabled={isSubmitting}
                      type="submit"
                      variant="contained"
                      color="secondary"
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
                </div>
              </Form>
            )}
          </Formik>
        )}
      </React.Fragment>
    </React.Fragment>
  );
}
