import { Box, Paper, Typography } from "@mui/material";
import { useStyle } from "../Style";
import React from "react";

const getDeliveryTime = (deliveryOption) => {
  switch (deliveryOption) {
    case 0:
      return 0;
    case 1:
      return 1;
    case 2:
      return 2;
    case 7:
      return 7;
  }
};

export function AddressInfo(props) {
  const { orderProcessingDelay } = props;
  console.log(">>> " + orderProcessingDelay);
  const { formValues = "empty" } = props || {};
  const classes = useStyle();
  const {
    first,
    last,
    address,
    extra,
    city,
    province,
    country,
    postal,
    phone,
    shipping,
  } = formValues;
  const deliveryDate = new Date();
  deliveryDate.setDate(
    deliveryDate.getDate() +
      getDeliveryTime(shipping) +
      Number(orderProcessingDelay) ?? 0
  );

  return (
    <Box sx={{ height: 300 }}>
      <Typography variant="h6" gutterBottom>
        <b>Shipping</b>
      </Typography>
      <Box mt={2} sx={{ height: 1 }}>
        <Paper variant="outlined" sx={{ height: 1 }}>
          <Box p={2}>
            <Typography variant="body1" gutterBottom align="left">
              <b>{`Name: `}</b>
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              align="left"
            >{`${first} ${last}`}</Typography>
            <Typography variant="body1" gutterBottom align="left">
              <b>{`Shipping Address: `}</b>
            </Typography>
            <Typography variant="body1" gutterBottom align="left">
              {`${address}, ${extra}`}
            </Typography>
            <Typography variant="body1" gutterBottom align="left">
              {`${city}, ${province}, ${country}, ${postal}`}
            </Typography>
            <Typography variant="body1" gutterBottom align="left">
              {`${phone}`}
            </Typography>
            <Typography variant="body1" gutterBottom align="left">
              <b>{`Estimated Shipping Date: `}</b>
            </Typography>
            <Typography variant="body1" gutterBottom align="left">
              {`${deliveryDate.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}`}
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
