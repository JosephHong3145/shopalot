/* eslint-disable prettier/prettier */
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "../../contexts/AuthContext";
import { useFirebase } from "../../contexts/FirebaseContext";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import React from "react";

export const AboutUs = () => {
  return (
    <Container maxWidth="md">
      <Box mt={1} mb={1} mr={1} ml={1}>
        <Typography variant="h1">
          <b>About Us</b>
        </Typography>


      </Box>

    </Container>
  );
};

