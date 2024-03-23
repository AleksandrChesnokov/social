import React from "react";
import { Layout, Dropdown, Space, Avatar } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import UsersStore from "../../store/UsersStore.tsx";

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  height: 64,
  lineHeight: "64x",
  backgroundColor: "white",
  width: "100%",
  position: "sticky",
  top: 0,
  zIndex: 1,
  display: "flex",
  padding: "0 10vw",
  justifyContent: "flex-end",
  alignItems: "center",
};

const items: MenuProps["items"] = [
  {
    label: <a href="#">Выйти</a>,
    key: "0",
  },
];

export const Header = () => {
  const { setUserOfflineStatus, users } = UsersStore;
  const currentUserId = localStorage.getItem("userId") || "";
  const handleExit = () => {
    setUserOfflineStatus(currentUserId);
    localStorage.removeItem("userId");
  };
  const menuProps = {
    items,
    onClick: handleExit,
  };

  return (
    <Layout.Header style={headerStyle}>
      <Dropdown menu={menuProps} trigger={["click"]}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <Avatar
              size="large"
              icon={<UserOutlined />}
              src={users[currentUserId]?.avatar}
            />
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </Layout.Header>
  );
};
