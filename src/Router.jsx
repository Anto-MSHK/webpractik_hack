import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Employees from "./Components/Employees/Employees";

import LoginForm from "./Pages/AuthPage/LoginFrom";
import RegisterForm from "./Pages/AuthPage/RegisterForm";
import { Main } from "./Pages/MainAdminPage/MainAdminPage";
import { getRole, getToken } from "./store/services/tokenService";
import { FolderContent } from "./Components/FolderContent/FolderContent";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";

export const Router = () => {
  const select = useSelector(getToken());
  //   const select = true;
  const role = useSelector(getRole());
  console.log(role, "role");
  console.log("select");
  console.log(select);
  if (select) {
    return (
      <div>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/folders" element={<Main />}></Route>
          <Route path="/folders/:folderName/:id" element={<FolderContent />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/user/:userName/:id" element={<ProfilePage />} />
        </Routes>
      </div>
    );
  } else {
    return (
      <div>
        <Routes>
          <Route path="/" element={<LoginForm />} />/
          <Route path="/login" element={<LoginForm />} />/
          <Route path="/registration" element={<RegisterForm />}></Route>
        </Routes>
      </div>
    );
  }
};
