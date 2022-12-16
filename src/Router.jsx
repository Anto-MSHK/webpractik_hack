import { Route, Routes } from "react-router-dom";
import {Folder} from "./components/Folder/Folder";
import LoginForm from "./Pages/AuthPage/LoginFrom";
import RegisterForm from "./Pages/AuthPage/RegisterForm";
import { Main } from "./Pages/MainAdminPage/MainAdminPage";

export const Router = () => (
  <div>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/folder" element={<Folder/>} />
      <Route path = "/login" element = {<LoginForm/>}/>
      <Route path = '/registration' element = {<RegisterForm/>}></Route>
    </Routes>
  </div>
);
