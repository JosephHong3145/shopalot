import { Box, Grid } from "@mui/material";
import { Form } from "./containers/Form";
import { OrderTotal } from "./containers/OrderTotal";
import { PaymentNavbar } from "../../payment/components/PaymentNavbar";
import React from "react";

export const CheckoutView = () => {
  return (
    <div>
      <PaymentNavbar />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ width: 800 }}>
          <Grid container spacing={10} justifyContent="center">
            <Grid item xs={10} md={9}>
              <Form />
            </Grid>
            <Grid item xs={10} md={3}>
              <OrderTotal />
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};
