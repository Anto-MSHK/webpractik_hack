import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { BreadCrumbs } from "./Components/breadCrumbs/breadCrumbs";
import { FolderContent } from "./Components/breadCrumbs/FolderContent/FolderContent";
import Employees from "./Components/Employees/Employees";

import LoginForm from "./Pages/AuthPage/LoginFrom";
import RegisterForm from "./Pages/AuthPage/RegisterForm";
import { Main } from "./Pages/MainAdminPage/MainAdminPage";
import { getRole, getToken } from "./store/services/tokenService";

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
          <Route path="/folders/:id" element={<FolderContent />} />
          <Route path="/employees" element={<Employees />} />
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

//   <div>
//     <Routes>
//       <Route path="/" element={<Main />} />
//       <Route path="/folder" element={<Folder />} />
//       <Route path="/employees" element={<Employees />} />
//       <Route path="/login" element={<LoginForm />} />
//       <Route path="/registration" element={<RegisterForm />}></Route>
//     </Routes>
//   </div>
// );
