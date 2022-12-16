import { Route, Routes } from "react-router-dom";
import {Folder} from "./components/Folder/Folder";
import { Main } from "./Pages/MainAdminPage/MainAdminPage";

export const Router = () => (
  <div>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/folder" element={<Folder/>} />
    </Routes>
  </div>
);
