import React from "react";
import { List, Button, Avatar, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import UsersStore from "../../store/UsersStore.tsx";

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  profileId: number;
  friends: number[];
  posts: number[];
  messages: number[];
  avatar: string;
  bio: string;
  location: string;
  birthday: Date;
  gender: string;
  interests: string[];
  fullname: string;
  online: boolean;
  friendRequests: number[];
}

export const FriendListPage = observer(() => {
  const { users, removeFriend } = UsersStore;
  const currentUserId = localStorage.getItem("userId");
  const currentUser = users[currentUserId || ""];
  const userFriends: User[] = currentUser.friends.map((i) => users[i]);

  const removeFriendAndNotify = (friendId) => {
    removeFriend(currentUser.id, friendId);
    message.success("Друг удален");
  };

  return (
    <List
      style={{
        backgroundColor: "white",
        borderRadius: 8,
        padding: "10px",
      }}
      locale={{ emptyText: "Пусто" }}
      dataSource={userFriends}
      renderItem={(friend) => (
        <List.Item
          actions={[
            <Button>
              <Link to={`/${friend.id}`}>Профиль</Link>
            </Button>,
            <Button onClick={() => removeFriendAndNotify(friend.id)}>
              Удалить
            </Button>,
          ]}
        >
          <List.Item.Meta
            style={{
              alignItems: "flex-end",
            }}
            avatar={<Avatar src={friend.avatar} icon={<UserOutlined />} />}
            title={<Link to={`/${friend.id}`}>{friend.fullname}</Link>}
          />
        </List.Item>
      )}
    />
  );
});
