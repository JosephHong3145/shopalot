import { AddressInfo } from "../views/AddressInfo";
import { Box, Divider, Grid, Typography } from "@mui/material";
import { CartItem } from "./CartItem";
import { PaymentInfo } from "./PaymentInfo";
import { PricingInfo } from "./PricingInfo";
import { useFormikContext } from "formik";
import React from "react";

export function ReviewItems({ items, cartCost, orderProcessingDelay }) {
  const { values: formValues } = useFormikContext();

  return (
    <div>
      <Typography variant="h6">
        Order summary
        <p></p>
      </Typography>
      <Box>
        {items?.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </Box>
      <Box pb={5}>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <AddressInfo
              formValues={formValues}
              orderProcessingDelay={orderProcessingDelay}
            />
          </Grid>
          <Grid item xs={4}>
            <PaymentInfo formValues={formValues} />
          </Grid>
          <Grid item xs={4}>
            <PricingInfo formValues={formValues} cartCost={cartCost} />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
