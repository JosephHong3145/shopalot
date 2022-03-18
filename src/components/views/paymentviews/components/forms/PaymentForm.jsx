import { Field } from "../formBuilder/Field";
import { Grid, Typography } from "@mui/material";
import React from "react";

export function PaymentForm(props) {
  const {
    formField: { cardHolder, card, expiration, cvv },
  } = props;

  return (
    <div>
      <Typography variant="h6">
        Payment method
        <p></p>
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Field name={cardHolder.name} label={cardHolder.label} fullWidth />
        </Grid>
        <Grid item xs={12} md={12}>
          <Field name={card.name} label={card.label} fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <Field name={expiration.name} label={expiration.label} fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <Field name={cvv.name} label={cvv.label} fullWidth />
        </Grid>
      </Grid>
    </div>
  );
}
