import {
  Box,
  Button,
  Container,
  Grid,
  Select,
  Typography,
} from "@mui/material";
import React from "react";

export const CreateItemView = () => {
  return (
    <Container>
      <Typography variant="h5" color="error">
        {"Hello, World!"}
      </Typography>
      <Button variant="contained">{"My Button"}</Button>
      <Select></Select>
      <Grid container>
        <Grid item xs={12}>
          {"Spot #1"}
        </Grid>
      </Grid>
      <Box p={"12px"}>{"Hello, World!"}</Box>
      <Box
        display="flex"
        sx={{ width: 1 }}
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="subtitle2">Bla</Typography>
        <Box ml={2}>
          <Typography variant="h6">Bla</Typography>
        </Box>
        <Button>Hello</Button>
      </Box>
    </Container>
  );
};
