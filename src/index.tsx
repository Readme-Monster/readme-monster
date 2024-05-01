import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./pages/App";
import firebase from "./firebaseApp";
import "../src/styles/global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { SectionProvider } from "context/SectionContext";

const rootElement = document.getElementById("root");

console.log(firebase);

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <SectionProvider>
        <Router>
          <App />
        </Router>
      </SectionProvider>
    </React.StrictMode>,
  );
} else {
  console.error("Failed to find the root element");
}
