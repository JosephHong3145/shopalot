import { Grid } from "@mui/material";
import React from "react";

import { CheckoutContainer } from "../../payment/CheckoutContainer";

export const CheckoutView = () => {
  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "50vh" }}
    >
      <Grid item xs={6}>
        <CheckoutContainer />
      </Grid>
    </Grid>
  );
};
