import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  IdcardOutlined,
  ContainerOutlined,
  CommentOutlined,
  TeamOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";

const siderStyle: React.CSSProperties = {
  textAlign: "center",
  lineHeight: "120px",
  backgroundColor: "#dce1e6",
};

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(<Link to="/">Моя страница</Link>, "1", <IdcardOutlined />),
  getItem(<Link to="news">Новости</Link>, "2", <ContainerOutlined />),
  getItem(<Link to="users">Люди</Link>, "3", <GlobalOutlined />),
  getItem(<Link to="friend">Друзья</Link>, "4", <TeamOutlined />),
  getItem(<Link to="messages">Сообщения</Link>, "5", <CommentOutlined />),
];

export const Sider = () => {
  return (
    <Layout.Sider width="15vw" style={siderStyle}>
      <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="vertical"
        items={items}
        style={{
          borderRadius: 5,
        }}
      />
    </Layout.Sider>
  );
};
