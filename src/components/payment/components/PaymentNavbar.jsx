import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import React from "react";

function PaymentNavbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SHOP-A-LOT
          </Typography>
          <Typography color="inherit">USER FULL NAME</Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default PaymentNavbar;
