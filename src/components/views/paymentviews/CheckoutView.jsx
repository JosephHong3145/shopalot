import { Grid } from "@mui/material";
import React from "react";

export const CheckoutView = () => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <h1>xs=8</h1>
        </Grid>
        <Grid item xs={4}>
          <h1>xs=4</h1>
        </Grid>
        <Grid item xs={4}>
          <h1>xs=4</h1>
        </Grid>
        <Grid item xs={8}>
          <h1>xs=8</h1>
        </Grid>
      </Grid>
    </div>
  );
};
