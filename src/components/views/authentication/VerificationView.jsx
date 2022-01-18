import { Grid } from "@mui/material";
import React from "react";

import { VerificationForm } from "../../forms/VerificationForm";

export const VerificationView = () => {
  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={4}>
        <VerificationForm />
      </Grid>
    </Grid>
  );
};
