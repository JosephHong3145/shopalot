import { CheckboxField, InputField } from "./FormComponents";
import { Firestore, collection, query, where } from "firebase/firestore";
import {
  Button,
  CircularProgress,
  Grid,
  Stepper,
  Step,
  StepLabel,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const placeholder = {
  shipping: [
    {
      userID: "1",
      shippingaddress: [
        {
          first: "Jan",
          last: "Tanner",
          address: "200 Providence Street",
          extra: "",
          city: "Montreal",
          province: "Quebec",
          country: "Canada",
          postal: "H3H8E2",
          phone: "5143922911",
        },
      ],
    },
  ],
};

export const AddressInfo = () => {
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
      useSameAddress,
    },
  } = props;

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <InputField name={first.name} label={first.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField name={last.name} label={last.label} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <InputField name={address.name} label={address.label} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <InputField name={extra.name} label={extra.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField name={city.name} label={city.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField name={province.name} label={province.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField name={postal.name} label={postal.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField name={country.name} label={country.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField name={phone.name} label={phone.label} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <CheckboxField
            name={useSameAddress.name}
            label={useSameAddress.label}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
