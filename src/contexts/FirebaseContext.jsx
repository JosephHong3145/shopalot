import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
import React from "react";

import Config from "../config";

const FirebaseContext = React.createContext();

export const FirebaseContextProvider = ({ children }) => {
  const app = initializeApp(Config.Firebase());
  const analytics = getAnalytics(app);
  const firestore = getFirestore(app);
  const auth = getAuth(app);
  const storage = getStorage(app);
  const value = { app, analytics, firestore, storage, auth };
  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  return React.useContext(FirebaseContext);
};
