import { Typography, Grid } from '@material-ui/core';
import useStyles from './styles';
import React from "react";

export function AddressInfo(props) {
  const { formValues } = props;
  const classes = useStyles();
  const { first, last, address } = formValues;

  return (
    <Grid item xs={12} sm={6}>
      <Typography variant="h6" gutterBottom className={classes.title}>
        Shipping
      </Typography>
        <Typography gutterBottom>{`${first} ${last}`}</Typography>
        <Typography gutterBottom>{`${address}`}</Typography>
      </Typography>
    </Grid>
  );
}
