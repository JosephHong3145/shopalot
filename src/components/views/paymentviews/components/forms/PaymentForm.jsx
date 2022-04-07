import { Check } from "../formBuilder/Check";
import { Field } from "../formBuilder/Field";
import { Grid, Typography } from "@mui/material";
import React from "react";

export function PaymentForm(props) {
  const {
    formField: {
      cardHolderFirst,
      cardHolderLast,
      card,
      expiration,
      ccv,
      useSameAddress,
      billingAddress,
      billingExtra,
      billingCity,
      billingProvince,
      billingCountry,
      billingPostal,
    },
  } = props;
  const [disabled, setDisabled] = React.useState(false);

  return (
    <React.Fragment>
      <Typography variant="h6">
        Payment Method
        <p></p>
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Field
            name={cardHolderFirst.name}
            label={cardHolderFirst.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            name={cardHolderLast.name}
            label={cardHolderLast.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Field name={card.name} label={card.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field name={expiration.name} label={expiration.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field name={ccv.name} label={ccv.label} fullWidth />
        </Grid>
        <Grid item xs={12} align="left">
          <Check
            name={useSameAddress.name}
            label={useSameAddress.label}
            onDisabledChange={(disabled) => setDisabled(disabled)}
          />
        </Grid>
        <React.Fragment>
          <Grid item xs={12}>
            <Field
              name={billingAddress.name}
              label={billingAddress.label}
              fullWidth
              disabled={disabled}
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              name={billingExtra.name}
              label={billingExtra.label}
              fullWidth
              disabled={disabled}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              name={billingCity.name}
              label={billingCity.label}
              fullWidth
              disabled={disabled}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              name={billingProvince.name}
              label={billingProvince.label}
              fullWidth
              disabled={disabled}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              name={billingPostal.name}
              label={billingPostal.label}
              fullWidth
              disabled={disabled}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              name={billingCountry.name}
              label={billingCountry.label}
              fullWidth
              disabled={disabled}
            />
          </Grid>
        </React.Fragment>
      </Grid>
    </React.Fragment>
  );
}
