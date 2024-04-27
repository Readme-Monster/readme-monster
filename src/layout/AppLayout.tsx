import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../common/Header/Header";

const AppLayout = () => {
  return (
    <div className="w-full">
      <Header />
      <Outlet />
    </div>
  );
};

export default AppLayout;
