import { Button, Container, Grid, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import React from "react";

export const OrderConfirmationView = () => {
  return (
    <Container>
      <Typography variant="h5" color="primary">
        OrderConfirmationView
      </Typography>
      <Typography>
        {" "}
        <CheckCircleIcon color="primary" />
        Your order is placed, thanks.
      </Typography>
      <Button variant="contained">{"Continue shopping"}</Button>
    </Container>
  );
};
