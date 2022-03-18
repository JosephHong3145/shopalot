import { InputField } from "./FormComponents";
import { Grid, Typography } from '@material-ui/core';
import React from "react";

export default function PaymentForm(props) {
  const {
    formField: { nameOnCard, cardNumber, expiration, cvv }
  } = props;

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <InputField
            name={cardHolder.name}
            label={nameOnCard.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <InputField
            name={cardNumber.name}
            label={cardNumber.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
        <InputField
            name={expiration.name}
            label={expiration.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField name={cvv.name} label={cvv.label} fullWidth />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}