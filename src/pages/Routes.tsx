import AppLayout from "../layout/AppLayout";
import React from "react";
import { Route, Routes as ReactRouterRoutes, Navigate } from "react-router-dom";
import HomePage from "./HomePage";
import NotFoundPage from "./NotFoundPage/NotFoundPage";
import ReadmeBuilder from "./builder/ReadmeBuilder";
import MyPage from "./myPage";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import BoardPage from "./BoardPage";
interface RouterProps {
  isAuthenticated: boolean;
}

const ProtectedRoute = ({ element, isAuthenticated }: { element: React.ReactNode; isAuthenticated: boolean }) => {
  return isAuthenticated ? element : <Navigate to="/login" />;
};

export const Routes = ({ isAuthenticated }: RouterProps) => {
  return (
    <ReactRouterRoutes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/board" element={<BoardPage />} />
        <Route path="/editor" element={<ReadmeBuilder />} />
        {isAuthenticated ? (
          <Route path="/myPage" element={<MyPage />} />
        ) : (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </ReactRouterRoutes>
  );
};
