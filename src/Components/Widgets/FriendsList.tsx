import React from "react";
import { List, Avatar, Tag, Tabs } from "antd";
import type { TabsProps } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export const FriendsList = ({ userFriends }) => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Все друзья",
      children: (
        <List
          dataSource={userFriends}
          locale={{ emptyText: "Пусто" }}
          renderItem={(friend) => (
            <List.Item
              extra={
                <Tag color={friend.online ? "green" : "red"}>
                  {friend.online ? "Онлайн" : "Офлайн"}
                </Tag>
              }
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    size={40}
                    src={friend.avatar}
                    icon={<UserOutlined />}
                  />
                }
                title={<Link to={`/${friend.id}`}>{friend.fullname}</Link>}
              />
            </List.Item>
          )}
        />
      ),
    },
    {
      key: "2",
      label: "Друзья онлайн",
      children: (
        <List
          dataSource={userFriends?.filter((friend) => friend.online)}
          locale={{ emptyText: "Пусто" }}
          renderItem={(friend) => (
            <List.Item
              extra={
                <Tag color={friend.online ? "green" : "red"}>
                  {friend.online ? "Онлайн" : "Офлайн"}
                </Tag>
              }
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    size={40}
                    src={friend.avatar}
                    icon={<UserOutlined />}
                  />
                }
                title={<Link to={`/${friend.id}`}>{friend?.fullname}</Link>}
              />
            </List.Item>
          )}
        />
      ),
    },
    {
      key: "3",
      label: "Друзья офлайн",
      children: (
        <List
          dataSource={userFriends?.filter((friend) => !friend.online)}
          locale={{ emptyText: "Пусто" }}
          renderItem={(friend) => (
            <List.Item
              extra={
                <Tag color={friend.online ? "green" : "red"}>
                  {friend.online ? "Онлайн" : "Офлайн"}
                </Tag>
              }
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    size={40}
                    src={friend.avatar}
                    icon={<UserOutlined />}
                  />
                }
                title={<Link to={`/${friend?.id}`}>{friend.fullname}</Link>}
              />
            </List.Item>
          )}
        />
      ),
    },
  ];
  return (
    <Tabs
      defaultActiveKey="all"
      style={{
        width: "100%",
        backgroundColor: "white",
        borderRadius: 8,
        padding: "10px",
      }}
      items={items}
    />
  );
};
