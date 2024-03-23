import React from "react";
import { Form, Input, Button, notification } from "antd";
import { observer } from "mobx-react-lite";
import UsersStore from "../../store/UsersStore.tsx";

const RegistrationForm = observer(() => {
  const { registerUser } = UsersStore;
  const [form] = Form.useForm();

  const handleRegistrationFinish = (values) => {
    const { username, email, password, fullname, bio } = values;

    const registrationResult = registerUser({
      username,
      email,
      password,
      fullname,
      bio,
    });

    if (registrationResult.success) {
      notification.success({
        message: registrationResult.message,
      });
    } else {
      notification.error({
        message: registrationResult.message,
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Ошибка:", errorInfo);
  };

  return (
    <Form
      form={form}
      name="registration_form"
      onFinish={handleRegistrationFinish}
      onFinishFailed={onFinishFailed}
      layout="vertical"
    >
      <Form.Item
        label="Имя пользователя"
        name="username"
        rules={[
          { required: true, message: "Пожалуйста, введите имя пользователя!" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Электронная почта"
        name="email"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите свою электронную почту!",
          },
          {
            type: "email",
            message:
              "Пожалуйста, введите действительный адрес электронной почты!",
          },
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

      <Form.Item
        label="Полное имя"
        name="fullname"
        rules={[
          { required: true, message: "Пожалуйста, введите ваше полное имя!" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Биография"
        name="bio"
        rules={[
          { required: true, message: "Пожалуйста, введите вашу биографию!" },
        ]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Зарегистрироваться
        </Button>
      </Form.Item>
    </Form>
  );
});
export default RegistrationForm;
