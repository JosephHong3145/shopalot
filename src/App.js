import { BrowserRouter as Router } from "react-router-dom";
import React from "react";

import { AuthContextProvider } from "./contexts/AuthContext";
import { FirebaseContextProvider } from "./contexts/FirebaseContext";
import { Routes } from "./routes";
import NavBar from "./components/navigation/NavBar";

function App() {
  return (
    <FirebaseContextProvider>
      <AuthContextProvider>
        <Router>
          <NavBar />
          <Routes />
        </Router>
      </AuthContextProvider>
    </FirebaseContextProvider>
  );
}

export default App;
