import React from "react"; 
import { Route, Routes as ReactRouterRoutes, Navigate } from "react-router-dom";
import HomePage from "./HomePage";


export const Routes = () => {
  return (
    <ReactRouterRoutes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </ReactRouterRoutes>
  );
};
