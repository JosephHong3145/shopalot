import { Box, Button, Container, Paper, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import React from "react";

export const OrderConfirmationView = () => {
  return (
    <Container maxWidth="md">
      <Box mt={2}>
        <Paper elevation={5}>
          <Box p={1}>
            <Box display="flex" alignItems="center" sx={{ p: 1 }}>
              <CheckCircleIcon color="primary" />
              <Box ml={"4px"}>
                <Typography variant="h5" color="primary">
                  Your order is placed, thanks.
                </Typography>
              </Box>
            </Box>
            <Box ml={4}>
              <Typography variant="body1" gutterBottom>
                {'Orders can be seen in the "My Orders" page.'}
              </Typography>
            </Box>
            <Box ml={3}>
              <Button href="/my-orders" size="h10">
                {"Review your orders"}
              </Button>
            </Box>
          </Box>
        </Paper>

        <Box textAlign="right" marginTop={20}>
          <Button href="/items" variant="contained" size="small">
            {"Continue shopping"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
