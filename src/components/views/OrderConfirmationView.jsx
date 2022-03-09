import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Spacing,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import React from "react";

export const OrderConfirmationView = () => {
  return (
    <Container>
      <Typography>OrderConfirmationView</Typography>
      <Paper elevation={5}>
        <Box textAlign="left" sx={{ p: 1 }}>
          <Typography variant="h5" color="primary">
            {" "}
            <CheckCircleIcon color="primary" />
            Your order is placed, thanks.{" "}
          </Typography>
        </Box>
        <Box marginLeft={4}>
          <Typography variant="h12" marginBottom={20}>
            Confirmation will be sent to your email.
          </Typography>
        </Box>
        <Box marginLeft={3}>
          <Button size="h10" marginLeft={3}>
            {"Review your orders"}
          </Button>
        </Box>
      </Paper>
      <Box textAlign="right" marginTop={20}>
        <Button variant="contained" size="small">
          {"Continue shopping"}
        </Button>
      </Box>
    </Container>
  );
};
