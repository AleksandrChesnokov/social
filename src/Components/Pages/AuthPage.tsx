import React, { useState } from "react";
import { Layout, Space, Button } from "antd";
import RegistrationForm from "../Widgets/RegistrationForm.tsx";
import LoginForm from "../Widgets/LoginForm.tsx";

const AuthPage = () => {
  const [isRegistration, setIsRegistration] = useState(false);

  const toggleForm = () => {
    setIsRegistration(!isRegistration);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout.Content style={{ padding: "50px", margin: "auto" }}>
        <div style={{ textAlign: "center" }}>
          <Space direction="vertical" style={{ padding: "10px" }}>
            {isRegistration ? <RegistrationForm /> : <LoginForm />}
            <Button onClick={toggleForm}>
              {isRegistration
                ? "Перейти к авторизации"
                : "Перейти к регистрации"}
            </Button>
          </Space>
        </div>
      </Layout.Content>
    </Layout>
  );
};

export default AuthPage;
