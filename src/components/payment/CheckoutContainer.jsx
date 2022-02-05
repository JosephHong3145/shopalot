import { Grid } from "@mui/material";
import React from "react";

export const CheckoutContainer = () => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <h3>Shipping Address</h3>
        </Grid>
        <Grid item xs={3}>
          <h3>Order Summary</h3>
        </Grid>
        <Grid item xs={9}>
          <h3>Payment Method</h3>
        </Grid>
        <Grid item xs={9}>
          <h3>Review Items and Shipping</h3>
        </Grid>
      </Grid>
    </div>
  );
};
