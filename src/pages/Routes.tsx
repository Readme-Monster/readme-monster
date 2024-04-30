import AppLayout from "../layout/AppLayout";
import React from "react";
import { Route, Routes as ReactRouterRoutes } from "react-router-dom";
import HomePage from "./HomePage";
import NotFoundPage from "./NotFoundPage/NotFoundPage";
import ReadmeBuilder from "./Builder/ReadmeBuilder";
import MyPage from "./myPage";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";

export const Routes = () => {
  return (
    <ReactRouterRoutes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="editor" element={<ReadmeBuilder />} />
        <Route path="myPage" element={<MyPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </ReactRouterRoutes>
  );
};
