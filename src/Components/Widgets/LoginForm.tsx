import React from "react";
import { Form, Input, Button, notification } from "antd";
import UsersStore from "../../store/UsersStore.tsx";
import { useNavigate } from "react-router-dom";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const navigate = useNavigate();
  const { users, findUserByEmail } = UsersStore;

  const authenticateUser = (email: string, password: string) => {
    const user = findUserByEmail(email);
    if (!user || user.password !== password) {
      return { success: false, message: "Некорректная почта или пароль." };
    }
    users[user.id].online = true;
    return { success: true, message: "Вы авторизовались", user };
  };

  const handleLoginFinish = (values: LoginFormValues) => {
    const { email, password } = values;
    const loginResult = authenticateUser(email, password);
    if (loginResult.success) {
      localStorage.setItem("userId", `${loginResult.user?.id}`);
      notification.success({
        message: loginResult.message,
      });
      navigate("/");
    } else {
      notification.error({
        message: loginResult.message,
      });
    }
  };

  return (
    <Form name="login_form" onFinish={handleLoginFinish} layout="vertical">
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Пожалуйста, введите почту!" },
          { type: "email", message: "Пожалуйста, введите корректную почту!" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Пароль"
        name="password"
        rules={[{ required: true, message: "Пожалуйста, введите пароль!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Авторизоваться
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
