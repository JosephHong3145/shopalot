import { getAuth, onAuthStateChanged } from "@firebase/auth";
import React from "react";

import { useFirebase } from "./FirebaseContext";

export const AuthContext = React.createContext();

export const AuthContextProvider = (props) => {
  const [user, setUser] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState();
  const { app } = useFirebase();

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      getAuth(app),
      (user) => {
        setUser(user);
        if (loading) setLoading(false);
      },
      setError
    );
    return () => unsubscribe();
  }, [app, loading]);
  return <AuthContext.Provider value={{ user, loading, error }} {...props} />;
};

export const useAuthState = () => {
  const auth = React.useContext(AuthContext);
  return { ...auth, isAuthenticated: auth.user != null };
};
