import React from "react";
import { Route, Routes } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import NotFoundPage from "./NotFoundPage/NotFoundPage";

function App() {
  return (
    <div className="flex-Center h-[100vh]">
      <Routes>
        <Route path="/" element={<AppLayout />}></Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
