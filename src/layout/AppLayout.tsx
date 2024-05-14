import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Common/Header/Header";
import HeadMeta from "./HeadMeta";

const AppLayout = () => {
  return (
    <div className="w-full">
      <HeadMeta/>
      <Header />
      <Outlet />
    </div>
  );
};

export default AppLayout;
