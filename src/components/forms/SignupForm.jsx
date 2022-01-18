import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import React from "react";

import { Paths } from "../../paths";
import { useFirebase } from "../../contexts/FirebaseContext";

export const SignupForm = () => {
  const navigate = useNavigate();
  const { handleSubmit, control, setError, getValues } = useForm();
  const { app } = useFirebase();
  const auth = getAuth(app);
  const [isRegistering, setIsRegistering] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const onRegister = () => {
    navigate(Paths.verify());
  };

  const onSubmit = (data) => {
    setIsRegistering(true);
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((credentials) => {
        sendEmailVerification(credentials.user);
        onRegister();
      })
      .catch((error) => {
        setIsRegistering(false);
        console.log(error);
        if (error.code === "auth/invalid-email") {
          setError("email", {
            type: "invalidEmail",
            message: "E-mail address invalid",
          });
        } else if (error.code === "auth/email-already-in-use") {
          setError("email", {
            type: "emailAlreadyInUse",
            message: "E-mail address is already in use",
          });
        } else if (error.code === "auth/weak-password") {
          let message = error.message;
          message = message.substring(10, message.length - 22);
          setError("password", {
            type: "weakPassword",
            message: message,
          });
        }
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="email"
        control={control}
        defaultValue=""
        rules={{
          required: "E-mail address required",
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            fullWidth
            label="E-mail"
            variant="outlined"
            value={value}
            error={!!error}
            helperText={error ? error.message : null}
            onChange={onChange}
          />
        )}
      />
      <Box mt={2}>
        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{ required: "Password required" }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              value={value}
              error={!!error}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              helperText={error ? error.message : null}
              onChange={onChange}
            />
          )}
        />
      </Box>
      <Box mt={2}>
        <Controller
          name="confirm-password"
          control={control}
          defaultValue=""
          rules={{
            validate: (value) =>
              getValues("password") === value || "Passwords do not match",
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              fullWidth
              label="Confirm Password"
              variant="outlined"
              type="password"
              value={value}
              error={!!error}
              helperText={error ? error.message : null}
              onChange={onChange}
            />
          )}
        />
      </Box>
      <Box mt={2}>
        <Button
          type="submit"
          disabled={isRegistering}
          fullWidth
          variant="contained"
        >
          <Box m={1}>
            {isRegistering ? (
              <CircularProgress size={20} />
            ) : (
              <Typography>Sign Up</Typography>
            )}
          </Box>
        </Button>
      </Box>
    </form>
  );
};
