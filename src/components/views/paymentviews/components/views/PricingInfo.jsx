import { Box, Grid, Paper, Typography } from "@mui/material";
import { useStyle } from "../Style";
import React from "react";

const getDeliveryPrice = (deliveryOption) => {
  switch (deliveryOption) {
    case 0:
      return 45;
    case 1:
      return 35;
    case 2:
      return 25;
    case 7:
      return 8;
  }
};

const getDeliveryType = (deliveryOption) => {
  switch (deliveryOption) {
    case 0:
      return "Shopalot Prime";
    case 1:
      return "One-Day Delivery";
    case 2:
      return "Two-Day Delivery";
    case 7:
      return "Regular Shipping";
  }
};

export function PricingInfo(props) {
  const { cartCost } = props;
  const { formValues = "empty" } = props || {};
  const { shipping } = formValues;
  const total = (getDeliveryPrice(shipping) + Number(cartCost)) * 1.15;

  return (
    <Box sx={{ height: 300 }}>
      <Typography variant="h6" gutterBottom>
        <b>Pricing</b>
      </Typography>
      <Box mt={2} sx={{ height: 1 }}>
        <Paper variant="outlined" sx={{ height: 1 }}>
          <Box p={2}>
            <Typography variant="body1" gutterBottom align="left">
              <b>{`Cart Subtotal: `}</b>
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              align="left"
            >{`${cartCost}$ (w/ Taxes: ${(Number(cartCost) * 1.15).toFixed(
              2
            )}$)`}</Typography>
            <Typography variant="body1" gutterBottom align="left">
              <b>{`Shipping Price: `}</b>
            </Typography>
            <Typography variant="body1" gutterBottom align="left">
              {`${getDeliveryPrice(shipping).toFixed(2)}$ (${getDeliveryType(
                shipping
              )})`}
            </Typography>

            <Typography variant="body1" gutterBottom align="left">
              <b>{`Order Total: `}</b>
            </Typography>
            <Typography variant="body1" gutterBottom align="left">
              {`${total.toFixed(2)}$`}
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
