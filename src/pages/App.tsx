import { ToastContainer } from "react-toastify";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Routes } from "./Routes";
import { app } from "../firebaseApp";
import LoadingSpinner from "../components/Common/LoadingSpinner/LoadingSpinner";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const auth = getAuth(app);
  const [init, setInit] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!auth?.currentUser);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setInit(true);
    });
  }, [auth]);

  return (
    <>
      <ToastContainer 
        position="top-center" 
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {init ? <Routes isAuthenticated={isAuthenticated} /> : <LoadingSpinner/>}
    </>
  );
}

export default App;
