import React from "react";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";
import { useGetUserQuery } from "../../store/services/userService";
import { useSelector } from "react-redux";
import { getToken, getUser } from "../../store/services/tokenService";

export const Head = () => {
  const { Header } = Layout;
  const userId = useSelector(getUser());
  const { data: currentUser, error, isLoading } = useGetUserQuery(userId);
  const select = useSelector(getToken());

  console.log(userId);
  console.log(currentUser);
  return (
    <Header className="header">
      <div
        style={{
          display: "flex",
          height: "64px",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link to="/">
          <h1 style={{ color: "white" }}>Вебпрактик</h1>
        </Link>
        {!userId || select === null ? (
          <Link style={{ color: "white" }} to="/login">
            <UserOutlined style={{ fontSize: "20px" }} />{" "}
            <Button ghost>Login/Register</Button>
          </Link>
        ) : (
          currentUser && (
            <Link
              style={{ color: "white" }}
              to={`user/${currentUser.name && currentUser.name}/${userId}`}
            >
              <UserOutlined style={{ fontSize: "20px" }} />{" "}
              <Button ghost>
                {isLoading ? "Загрузка..." : currentUser.email}
              </Button>
            </Link>
          )
        )}
      </div>
    </Header>
  );
};
