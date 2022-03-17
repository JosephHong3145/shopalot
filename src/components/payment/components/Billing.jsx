import { Box, Form, Grid, TextField } from "@mui/material";
import { useFirebase } from "../../../contexts/FirebaseContext";
import React, { useState } from "react";

export const PaymentInfo = () => {
  const cardType = ["amex", "mastercard", "visa"];
  // Get the user's payment info that are stored in the database
  const [billing, setBilling] = useState([]);
  // Start fetching as soon as the page starts loading
  window.addEventListener("load", () => {
    FetchData();
  });

  // Fetch the payment info data
  const FetchData = () => {
    useFirebase
      .collection("billing")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          const billing = element.billing();
          setBilling((arr) => [...arr, billing]);
        });
      });
  };

  return (
    <Box
      component="form"
      sx={{ "& .MuiTextField-root": { m: 1, width: "100%" } }}
      noValidate
      autoComplete="off"
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <TextField id="standard-address" label="Address" variant="standard" />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            id="standard-card"
            label="Card number"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            id="standard-expiration"
            label="Expiration date (MMYY)"
            variant="standard"
            width="4ch"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            id="standard-postal"
            label="Postal"
            variant="standard"
            width="10ch"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            id="standard-cvc"
            label="CVC"
            variant="standard"
            width="4ch"
          />
        </Grid>
      </Grid>
    </Box>
  );
};
