import React, { useState, useEffect } from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  Popover,
  Segmented,
  Upload,
} from "antd";
import {
  FileAddFilled,
  PlusCircleFilled,
  MailOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useCreateFolderMutation } from "../../store/services/folderService";
import "./BreadCrumbsUsers.css";
import { useSignUpMutation } from "../../store/services/authService";
import { getUser } from "../../store/services/tokenService";
import { useGetUserQuery } from "../../store/services/userService";
const { Search } = Input;

export const BreadCrumbsUser = () => {
  const [addUser] = useSignUpMutation();
  const [secretLink, setSecretLink] = useState("");
  const userId = useSelector(getUser());
  const { data: currentUser, error, isLoading } = useGetUserQuery(userId);
  /*    const navigate = useNavigate(); */
  const createFolder = async (fieldsValue) => {
    addUser({
      name: fieldsValue.name,
      department: fieldsValue.department,
      isAccessHight: fieldsValue.isAccessHight,
      email: fieldsValue.email,
    })
      .unwrap()
      .then((data) => {
        setSecretLink(data.activateAccountCode);
      });
  };

  const onFinish = (fieldsValue) => {
    createFolder(fieldsValue);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const content = (
    <div style={{ display: "flex", flexDirection: "column", rowGap: "5px" }}>
      <div style={{ width: "200px" }}>
        <Form
          className="authForm"
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Имя"
            name="name"
            rules={[
              {
                required: true,
                message: "Пожалуйста, введите ваше имя!",
              },
              () => ({
                validator(_, value) {
                  if (!value || value.match(/(^[а-яА-я]+)$/)) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error(
                      "Имя не должно содержать цифр, символов и пробелов"
                    )
                  );
                },
              }),
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Отдел" name="department">
            <Input />
          </Form.Item>

          <Form.Item
            name="isAccessHight"
            valuePropName="checked"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Checkbox>Доступ</Checkbox>
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Пожалуйста, введите вашу электронную почту!",
              },
              () => ({
                validator(_, value) {
                  if (
                    !value ||
                    value.match(
                      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
                    )
                  ) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Неправильный формат почты!")
                  );
                },
              }),
            ]}
          >
            <Input prefix={<MailOutlined />} />
          </Form.Item>

          <Form.Item
            style={{ margin: "0 auto" }}
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Button type="primary" htmlType="submit">
              Зарегистрировать
            </Button>
          </Form.Item>
        </Form>
        {secretLink && (
          <p>
            Специальный код для пользователя:
            <h4 style={{ margin: 0 }}> {secretLink}</h4>
          </p>
        )}
      </div>
    </div>
  );
  return (
    <div className="breadCrumbs-main">
      <Card>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div>
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/folders">Документы</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to="/employees">Сотрудники</Link>
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div>
            <Search placeholder="Поиск" />
          </div>
          <div className={"breadCrumbs-button"}>
            {!isLoading && currentUser.role === "ADMIN" && (
              <Popover content={content} trigger="click">
                <Button type={"primary"} onClick={() => setSecretLink("")}>
                  <PlusCircleFilled />
                </Button>
              </Popover>
            )}{" "}
          </div>
        </div>
      </Card>
    </div>
  );
};
