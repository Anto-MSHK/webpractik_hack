import { BreadCrumbsUser } from "./../breadCrumbsUsers/breadCrumbsUser";
import React, { useEffect, useState } from "react";
import { useGetUsersQuery } from "../../store/services/userService";
import { BreadCrumbsEmployees } from "../BreadCrumbsEmployees/BreadCrumbsEmployees";
import Spinner from "../SpinnerComponents/Spinner";

import Employee from "./Employee";

const Employees = () => {
  const { data: employees, isFetching, isError } = useGetUsersQuery();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log(employees);
    setUsers(employees);
  }, [employees]);

  const handleSearchedUsers = (searchedUsers) => {
    setUsers(searchedUsers);
  };

  if (isError) {
    return (
      <div
        style={{ display: "flex", flexDirection: "column", width: "1200px" }}
      >
        <div style={{ display: "flex", margin: "0 auto" }}>
          <h1>Произошла какая-то ошибка, либо у вас нет доступа</h1>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <BreadCrumbsUser />
      <div style={{ display: "flex" }}>
        {isFetching ? (
          <div style={{ marginTop: "10px", margin: "0 auto" }}>
            <Spinner text="Загружаем сотрудников..." size="large" />
          </div>
        ) : users && users.length ? (
          users.map((employee) => <Employee key={employee._id} {...employee} />)
        ) : (
          <h1>Сотрудников не найдено</h1>
        )}
      </div>
    </div>
  );
};

export default Employees;
