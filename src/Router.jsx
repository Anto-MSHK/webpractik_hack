import { Route, Routes } from "react-router-dom";
import { MainAdminPage } from "./Pages/MainAdminPage/MainAdminPage";

export const Router = () => (
  <div>
    <Routes>
      <Route path="/" element={<MainAdminPage />} />
    </Routes>
  </div>
);
