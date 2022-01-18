import { Navigate, useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import React from "react";

import { Paths } from "../../paths";
import { getAuth } from "firebase/auth";
import { useFirebase } from "../../contexts/FirebaseContext";

export const RequireAuth = ({ children }) => {
  const { app } = useFirebase();
  const auth = getAuth(app);
  const [user, loading, error] = useAuthState(auth);
  const location = useLocation();
  return !loading && !!user ? (
    children
  ) : (
    <Navigate to={Paths.login()} replace state={{ path: location.pathname }} />
  );
};
