import AppLayout from "../layout/AppLayout";
import React from "react";
import { Route, Routes as ReactRouterRoutes } from "react-router-dom";
import HomePage from "./HomePage";
import NotFoundPage from "./NotFoundPage/NotFoundPage";
import ReadmeBuilder from "./builder/ReadmeBuilder";
import MyPage from "./myPage";

export const Routes = () => {
  return (
    <ReactRouterRoutes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/editor" element={<ReadmeBuilder />} />
      <Route path="/myPage" element={<MyPage />} />
    </ReactRouterRoutes>
  );
};
