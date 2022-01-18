import { BrowserRouter as Router } from "react-router-dom";
import React from "react";

import { FirebaseProvider } from "./contexts/FirebaseContext";
import { Routes } from "./routes";

function App() {
  return (
    <FirebaseProvider>
      <Router>
        <Routes />
      </Router>
    </FirebaseProvider>
  );
}

export default App;
