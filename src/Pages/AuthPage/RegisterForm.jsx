import React from "react";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import "./AuthForm.css";
import { useSignUpTopMutation } from "../../store/services/authService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createToken } from "../../store/services/tokenService";

const RegisterForm = () => {
  const [addRegister] = useSignUpTopMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = (values) => {
    console.log("Success:", values);
    addRegister(values)
      .unwrap()
      .then((data) => {
        navigate("/login");
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
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
        label="Код активации"
        name="activationLink"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите ваше имя!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Пароль"
        name="password"
        hasFeedback
        rules={[{ required: true, message: "Пожалуйста, введите ваш пароль!" }]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
        />
      </Form.Item>

      <Form.Item
        label="Подтвердите"
        name="confirmPassword"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Пожалуйста, подтвердите ваш пароль!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              console.log(value);
              return Promise.reject(new Error("Пароли не совпадают"));
            },
          }),
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
        />
      </Form.Item>

      <Form.Item
        style={{ margin: "0 auto" }}
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Button type="primary" htmlType="submit">
          Активировать
        </Button>
      </Form.Item>
      <p>
        После активации вы попадёте на страницу регистрации. Укажите вашу почту
        для входа и созданный пароль.
      </p>
    </Form>
  );
};

export default RegisterForm;
