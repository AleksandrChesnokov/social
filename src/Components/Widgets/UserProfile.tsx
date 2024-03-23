import React from "react";
import { Card, Avatar, Tag, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

export const UserProfile = ({ selectedUser }) => (
  <Card
    title="Профиль пользователя"
    extra={
      <Tag
        icon={<UserOutlined />}
        color={selectedUser.online ? "green" : "red"}
      >
        {selectedUser.online ? "Онлайн" : "Офлайн"}
      </Tag>
    }
  >
    <Card.Meta
      avatar={
        <Avatar size={100} src={selectedUser?.avatar} icon={<UserOutlined />} />
      }
      title={selectedUser?.fullname}
      description={selectedUser?.bio}
    />
  </Card>
);
