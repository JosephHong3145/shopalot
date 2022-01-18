import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import React from "react";

import Config from "../config";

const FirebaseContext = React.createContext();

export const FirebaseProvider = ({ children }) => {
  const app = initializeApp(Config.Firebase());
  const analytics = getAnalytics(app);
  const value = { app, analytics };
  return <FirebaseContext.Provider value>{children}</FirebaseContext.Provider>;
};

export const useFirebase = () => {
  return React.useContext(FirebaseContext);
};
