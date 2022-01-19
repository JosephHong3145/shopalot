import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React from "react";

import { Paths } from "../../paths";
import { useFirebase } from "../../contexts/FirebaseContext";

export const LoginForm = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { handleSubmit, control, setError } = useForm();
  const [isLoggingIn, setIsLoggingIn] = React.useState(false);
  const { app } = useFirebase();
  const auth = getAuth(app);

  const onLogin = (user) => {
    navigate(state?.path || Paths.home());
  };

  const onSubmit = (data) => {
    setIsLoggingIn(true);
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((credentials) => onLogin(credentials.user))
      .catch((error) => {
        setIsLoggingIn(false);
        if (error.code === "auth/invalid-email") {
          setError("email", {
            type: "invalidEmail",
            message: "E-mail address invalid",
          });
        } else if (error.code === "auth/too-many-requests") {
          setError("email", {
            type: "accountDisabled",
            message:
              "Account temporarily disabled due to failed login attempts. Try again later!",
          });
        } else {
          setError("email", {
            type: "invalidCredentials",
            message: "E-mail address and password do not match",
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
          disabled={isLoggingIn}
          fullWidth
          variant="contained"
        >
          <Box m={1}>
            {isLoggingIn ? (
              <CircularProgress size={20} />
            ) : (
              <Typography>Login</Typography>
            )}
          </Box>
        </Button>
      </Box>
      <Box display="flex" justifyContent="center" mt={2}>
        <Typography>
          {"Don't have an account? "}
          <Link
            to={Paths.signup()}
            style={{ textDecoration: "none" }}
            state={{ path: state?.path }}
          >
            Signup here!
          </Link>
        </Typography>
      </Box>
    </form>
  );
};
