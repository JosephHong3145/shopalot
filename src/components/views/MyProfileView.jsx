import { Box } from "@mui/system";
import { Link, Typography } from "@mui/material";
import { getAuth, signOut } from "firebase/auth";
import React from "react";

import { useAuthState } from "../../contexts/AuthContext";
import { useFirebase } from "../../contexts/FirebaseContext";

export const MyProfileView = () => {
  const { app } = useFirebase();
  const auth = getAuth(app);
  const { user } = useAuthState();

  return (
    <Box display="flex" alignItems="center">
      <Typography display="inline">
        MyProfileView ({user.displayName})
      </Typography>
      <Typography>
        &nbsp;&#8226;&nbsp;
        <Link
          onClick={() => signOut(auth)}
          style={{ textDecoration: "none", cursor: "pointer" }}
        >
          [Sign Out]
        </Link>
      </Typography>
    </Box>
  );
};
