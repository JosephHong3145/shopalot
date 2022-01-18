import { Grid } from "@mui/material";
import React from "react";

import { LoginForm } from "../../forms/LoginForm";

export const LoginView = () => {
  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={3}>
        <LoginForm />
      </Grid>
    </Grid>
  );
};
