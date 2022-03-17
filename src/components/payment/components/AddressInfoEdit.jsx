import { Box, Grid, MenuItem, TextField } from "@mui/material";
import { useFirebase } from "../../../contexts/FirebaseContext";
import React, { useState } from "react";

const provinces = [
  {
    value: "AB",
    label: "AB",
  },
  {
    value: "BC",
    label: "BC",
  },
  {
    value: "MB",
    label: "MB",
  },
  {
    value: "NB",
    label: "NB",
  },
  {
    value: "NL",
    label: "NL",
  },
  {
    value: "NS",
    label: "NS",
  },
  {
    value: "NT",
    label: "NT",
  },
  {
    value: "NU",
    label: "NU",
  },
  {
    value: "ON",
    label: "ON",
  },
  {
    value: "PE",
    label: "PE",
  },
  {
    value: "QC",
    label: "QC",
  },
  {
    value: "SK",
    label: "SK",
  },
  {
    value: "YT",
    label: "YT",
  },
];

export const AddressInfoEdit = () => {
  const [province, setProvince] = React.useState("Province");

  const handleChange = (event) => {
    setProvince(event.target.value);
  };

  // Send address to database
  const [userAddress, setUserAddress] = useState("");

  const updateInput = (e) => {
    setUserAddress({
      ...userAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setUserAddress({
      first: "",
      last: "",
      address: "",
      extra: "",
      city: "",
      province: "",
      country: "",
      postal: "",
    });
  };

  return (
    <Box
      component="form"
      sx={{ "& .MuiTextField-root": { m: 1, width: "100%" } }}
      noValidate
      autoComplete="off"
    >
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              id="standard-first"
              label="First name"
              onChange={updateInput}
              value={userAddress.first || ""}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="standard-last"
              label="Last name"
              onChange={updateInput}
              value={userAddress.last || ""}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              id="standard-address"
              label="Address"
              onChange={updateInput}
              value={userAddress.address || ""}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              id="standard-address-extra"
              label="Apt, Suite, Unit, etc."
              onChange={updateInput}
              value={userAddress.extra || ""}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField id="standard-city" label="City" variant="standard" />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              id="standard-province"
              select
              label="Province"
              value={province}
              onChange={handleChange}
              variant="standard"
            >
              {province.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                  onChange={updateInput}
                  value={userAddress.province || ""}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              id="standard-country"
              label="Country"
              onChange={updateInput}
              value={userAddress.country || ""}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              id="standard-postal"
              label="Postal"
              onChange={updateInput}
              value={userAddress.postal || ""}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <button type="submit">Submit</button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};
