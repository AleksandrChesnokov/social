import "./App.css";
import React from "react";
import { Layout } from "antd";
import { Header } from "./Components/Header/Header.tsx";
import { Sider } from "./Components/Sider/Sider.tsx";
import { Outlet } from "react-router-dom";

const contentStyle: React.CSSProperties = {
  lineHeight: "120px",
  marginLeft: "10px",
  borderRadius: 8,
};

function App() {
  return (
    <Layout>
      <Header />
      <Layout
        style={{
          padding: "1vh 10%",
          backgroundColor: "#dce1e6",
          minHeight: "calc(100vh - 64px)",
        }}
      >
        <Sider />
        <Layout.Content style={contentStyle}>
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
}

export default App;
