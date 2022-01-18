import { Box, Button, Divider, Skeleton, Typography } from "@mui/material";
import { getAuth, sendEmailVerification } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation, useNavigate } from "react-router-dom";
import React from "react";

import { Paths } from "../../paths";
import { useFirebase } from "../../contexts/FirebaseContext";

export const VerificationForm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { app } = useFirebase();
  const auth = getAuth(app);
  const [user] = useAuthState(auth);
  console.log(user);

  React.useEffect(() => {
    if (!user) {
      navigate(Paths.login());
    } else if (user.emailVerified) {
      navigate(state?.path || Paths.home());
    }
  }, [navigate, state?.path, user]);

  return (
    <Box>
      <Typography variant="h3">Verification Pending</Typography>
      <Divider />
      <Typography>An e-mail was sent to:</Typography>
      {user ? (
        <Typography>
          <Box fontWeight="fontWeightMedium" display="inline">
            {user.email}
          </Box>
        </Typography>
      ) : (
        <Skeleton />
      )}
      <Typography paragraph>
        {"Click on the link in the e-mail to complete your registration."}
        <br />
        {"If you don't see it, you may need to check your spam folder."}
      </Typography>
      <Button
        variant="contained"
        onClick={() => !!user && sendEmailVerification(user)}
      >
        Resend Verification
      </Button>
    </Box>
  );
};
