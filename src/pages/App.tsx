import { ToastContainer } from "react-toastify";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState, useContext } from "react";
import { Routes } from "./Routes";
import { app } from "../firebaseApp";
import ThemeContext from "context/ThemeContext";
import LoadingSpinner from "../components/Common/LoadingSpinner/LoadingSpinner";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const auth = getAuth(app);
  const context = useContext(ThemeContext);
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
      <div className={context.theme === "light" ? "white" : "dark"}>
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
          theme={context.theme === "light" ? "white" : "dark"}
        />
        {init ? <Routes isAuthenticated={isAuthenticated} /> : <LoadingSpinner/>}
      </div>
    </>
  );
}

export default App;
