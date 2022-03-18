import { Grid, Typography } from "@mui/material";
import { useFormixContext } from "formik";
import { AddressInfo } from "./AddressInfo";
import { PaymentInfo } from "/PaymentInfo";
import React, { Component, useState } from "react";

const placeholder = {
  cart: [
    {
      cost: 50.99,
      items: [
        {
          ID: "1",
          name: "Black Box",
          imageRef:
            "https://di2ponv0v5otw.cloudfront.net/posts/2018/07/10/5b45a8162140f3f8d4b2e9b2/m_5b45a818534ef923d7f95f2c.jpeg",
          quantity: 3,
          filters: [
            { name: "Size", value: "12" },
            { name: "Color", value: "Black" },
          ],
        },
      ],
    },
  ],
};

export const ReviewItems = () => {
  const { values: formValues } = useFormixContext();
  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
        Order summary
      </Typography>
      <Grid container spacing={2}>
        <AddressInfo formValues={formValues} />
        <PaymentInfo formValues={formValues} />
      </Grid>
    </React.Fragment>
  );
};
