import { Grid, Typography } from "@mui/material";
import { useStyle } from "./Style";
import React from "react";

export function AddressInfo(props) {
  const { formValues } = props;
  const classes = useStyle();
  const { first, last, address } = formValues;

  return (
    <Grid item xs={12} sm={6}>
      <Typography variant="h6" gutterBottom className={classes.title}>
        Shipping
      </Typography>
      <Typography gutterBottom>{`${first} ${last}`}</Typography>
      <Typography gutterBottom>{`${address}`}</Typography>
    </Grid>
  );
}
