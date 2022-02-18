import { Grid } from "@mui/material";
import AddressContainer from "../../../payment/container/AddressContainer";
import PaymentNavbar from "../../../payment/components/PaymentNavbar";
import React from "react";

export const CheckoutContainer = () => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <PaymentNavbar />
        </Grid>
        <Grid item xs={9}>
          <AddressContainer />
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
