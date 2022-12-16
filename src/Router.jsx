import { Route, Routes } from "react-router-dom";
import { Main } from "./Pages/MainAdminPage/MainAdminPage";

export const Router = () => (
  <div>
    <Routes>
      <Route path="/" element={<Main />} />
    </Routes>
  </div>
);
