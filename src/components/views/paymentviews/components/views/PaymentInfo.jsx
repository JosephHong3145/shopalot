import { Box, Grid, Paper, Typography } from "@mui/material";
import { useStyle } from "../Style";
import React from "react";

export function PaymentInfo(props) {
  const { formValues = "empty" } = props || {};
  const classes = useStyle();
  const { cardHolderFirst, cardHolderLast, card, expiration } = formValues;

  return (
    <Box sx={{ height: 300 }}>
      <Typography variant="h6" gutterBottom>
        <b>Billing</b>
      </Typography>
      <Box mt={2} sx={{ height: 1 }}>
        <Paper variant="outlined" sx={{ height: 1 }}>
          <Box p={2}>
            <Typography variant="body1" gutterBottom align="left">
              <b>{`Cardholder Name: `}</b>
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              align="left"
            >{`${cardHolderFirst} ${cardHolderLast}`}</Typography>
            <Typography variant="body1" gutterBottom align="left">
              <b>{`Card Info: `}</b>
            </Typography>
            <Typography variant="body1" gutterBottom align="left">
              {`${card} (${expiration})`}
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
