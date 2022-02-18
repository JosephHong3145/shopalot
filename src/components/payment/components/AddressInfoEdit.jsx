import { Box, TextField } from '@mui/material';
import { getStorage, ref } from "firebase/storage";
import React from 'react';

export const PaymentInfo = () => {
  return (
    <Box
      component="form"
      sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },
    }}
    noValidate
    autoComplete="off"
    >
      <div>
        <TextField id="standard-first" label="first" defaultValue="First name Fetch" variant="standard" />
        <TextField id="standard-last" label="last" defaultValue="Last name fetch" variant="standard" />
        <TextField id="standard-address" label="address" defaultValue="Address Fetch" variant="standard" />
        <TextField id="standard-extra" label="first" defaultValue="Address Extra Fetch" variant="standard" />
        <TextField id="standard-city" label="city" defaultValue="Full name Fetch" variant="standard" />
        <TextField id="standard-province" label="province" type="" />
        <TextField id="standard-country" label="country" defaultValue="Full name Fetch" variant="standard" />
        <TextField id="standard-postal" label="postal" defaultValue="Full name Fetch" variant="standard" />
      </div>
    </Box>
  );
};
