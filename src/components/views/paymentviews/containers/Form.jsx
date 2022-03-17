import { AddressInfo } from "../../../payment/components/AddressInfo";
import { Grid } from "@mui/material";
import { PaymentContainer } from "../../../payment/container/PaymentContainer";
import { ReviewItems } from "../../../payment/container/ReviewItems";
import React from "react";

export const Form = () => {
  return (
    <div>
      <Grid container rowSpacing={4}>
        <Grid item xs={12}>
          <AddressInfo />
        </Grid>
        <Grid item xs={12}>
          <PaymentContainer />
        </Grid>
        <Grid item xs={12}>
          <ReviewItems />
        </Grid>
      </Grid>
    </div>
  );
};
