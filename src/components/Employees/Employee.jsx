import Card from "antd/es/card/Card";
import React from "react";

const Employee = ({ name, email, role, password, activationLink }) => {
  return (
    <Card style={{ margin: "10px" }} title={<>{name}</>}>
      <div>Email:{email}</div>
      <div>Role: {role}</div>
      {!password && (
        <div style={{ color: "red" }}>
          Не активирован! Код активации: {activationLink}
        </div>
      )}
    </Card>
  );
};

export default Employee;
