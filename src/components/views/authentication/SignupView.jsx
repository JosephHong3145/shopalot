import { Grid } from "@mui/material";
import React from "react";

import { SignupForm } from "../../forms/SignupForm";

export const SignupView = () => {
  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={3}>
        <SignupForm />
      </Grid>
    </Grid>
  );
};
