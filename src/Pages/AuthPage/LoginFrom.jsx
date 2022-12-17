import React from "react";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import "./AuthForm.css";
import { Link, useNavigate } from "react-router-dom";
import { useSignInMutation } from "../../store/services/authService";
import { useDispatch } from "react-redux";
import { createToken } from "../../store/services/tokenService";

const LoginForm = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signIn] = useSignInMutation();

  const onFinish = (values) => {
    console.log("Success:", values);
    signIn(values)
      .unwrap()
      .then((data) => {
        dispatch(createToken(data));
        navigate("/");
      });
    // .catch(({ data: { message } }) => toast.error(message));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      className="login"
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Пожалуйста введите вашу электронную почту!",
          },
          () => ({
            validator(_, value) {
              if (
                !value ||
                value.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)
              ) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Неправильный формат почты!"));
            },
          }),
        ]}
      >
        <Input prefix={<MailOutlined />} />
      </Form.Item>

      <Form.Item
        label="Пароль"
        name="password"
        hasFeedback
        rules={[{ required: true, message: "Пожалуйста введите ваш пароль!" }]}
      >
        <Input.Password prefix={<LockOutlined />} />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <div style={{ display: "flex", margin: "0 auto" }}>
        <Form.Item
          style={{ margin: "0 auto" }}
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Button type="primary" htmlType="submit">
            Войти
          </Button>
        </Form.Item>

        <Form.Item
          style={{ margin: "0 auto" }}
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Button ghost type="primary" htmlType="submit">
            <Link style={{ color: "black" }} to="/registration">
              {" "}
              Не зарегистированы?
            </Link>
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default LoginForm;
