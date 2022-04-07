import { Field } from "../formBuilder/Field";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { FormikSelect } from "../formBuilder/FormikSelect";
import React from "react";

// query for the user ID that is currently logged in

export function AddressForm(props) {
  const {
    formField: {
      first,
      last,
      address,
      extra,
      city,
      province,
      country,
      postal,
      phone,
      deliveryOption,
    },
  } = props;

  return (
    <React.Fragment>
      <Typography variant="h6">
        Shipping address
        <p></p>
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Field name={first.name} label={first.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field name={last.name} label={last.label} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <Field name={address.name} label={address.label} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <Field name={extra.name} label={extra.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field name={city.name} label={city.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field name={province.name} label={province.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field name={postal.name} label={postal.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field name={country.name} label={country.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field name={phone.name} label={phone.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormikSelect
            name={deliveryOption.name}
            label={deliveryOption.label}
            options={[
              { key: "Shopalot Prime", value: 0 },
              { key: "Next-Day Shipping", value: 1 },
              { key: "Two-Day Shipping", value: 2 },
              { key: "Regular Shipping (7-days)", value: 7 },
            ]}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
