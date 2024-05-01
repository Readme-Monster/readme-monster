import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import React from "react";
import { Routes } from "./Routes";
import { app } from "../firebaseApp";
import LoadingSpinner from "../components/Common/LoadingSpinner/LoadingSpinner";

function App() {
  const auth = getAuth(app);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!auth?.currentUser
  );

  return <Routes isAuthenticated={isAuthenticated} />;
}

export default App;
