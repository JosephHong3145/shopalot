import { Box, Button, Container, Spacing, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import React from "react";

export const OrderConfirmationView = () => {
  return (
    <Container>
      <Typography>OrderConfirmationView</Typography>
      <Box textAlign="left" sx={{ p: 1 }}>
        <Typography variant="h5" color="primary">
          {" "}
          <CheckCircleIcon color="primary" />
          Your order is placed, thanks.{" "}
        </Typography>
      </Box>
      <Box marginLeft={4}>
        <Typography variant="h12">
          Confirmation will be sent to your email.
        </Typography>
      </Box>
      <Box textAlign="right" marginTop={10}>
        <Button variant="contained" size="small">
          {"Continue shopping"}
        </Button>
      </Box>
    </Container>
  );
};
