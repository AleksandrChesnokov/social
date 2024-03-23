import React, { useState } from "react";
import { Button, Avatar, List, message, Modal } from "antd";
import { UserOutlined, MessageOutlined, PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import UsersStore from "../../store/UsersStore.tsx";

const { confirm } = Modal;

const UsersListPage = () => {
  const userId = localStorage.getItem("userId");
  const currentUser = UsersStore.users[userId];

  const [users, setUsers] = useState(UsersStore.users);

  const handleAddFriend = (userId) => {
    const friendRequestSent = currentUser.friendRequests.includes(userId);
    if (!friendRequestSent) {
      UsersStore.addFriendRequest(currentUser.id, userId);
      const updatedUsers = {
        ...users,
        [userId]: {
          ...users[userId],
          friendRequests: [...users[userId].friendRequests, currentUser.id],
        },
      };
      setUsers(updatedUsers);
      message.success("Запрос на добавление в друзья отправлен");
    } else {
      message.warning("Запрос на добавление в друзья уже отправлен");
    }
  };

  const handleAcceptRequest = (requesterId) => {
    confirm({
      title: "Принять запрос?",
      content: "Вы уверены, что хотите принять запрос на добавление в друзья?",
      onOk() {
        UsersStore.acceptFriendRequest(currentUser.id, requesterId);
        const updatedCurrentUser = {
          ...currentUser,
          friendRequests: currentUser.friendRequests.filter(
            (id) => id !== requesterId
          ),
          friends: [...currentUser.friends, requesterId],
        };
        const updatedRequester = {
          ...users[requesterId],
          friendRequests: users[requesterId].friendRequests.filter(
            (id) => id !== currentUser.id
          ),
          friends: [...users[requesterId].friends, currentUser.id],
        };
        const updatedUsers = {
          ...users,
          [currentUser.id]: updatedCurrentUser,
          [requesterId]: updatedRequester,
        };
        setUsers(updatedUsers);
        message.success("Запрос на добавление в друзья принят");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <List
      itemLayout="horizontal"
      style={{ backgroundColor: "white", padding: "10px", borderRadius: 8 }}
      dataSource={Object.values(users)}
      renderItem={(user) => (
        <List.Item
          actions={[
            currentUser.id === user.id ? null : (
              <Link to={`/messages/${user.id}`}>
                <Button
                  icon={<MessageOutlined />}
                  onClick={() => console.log("Открыть сообщения")}
                >
                  Сообщения
                </Button>
              </Link>
            ),
            currentUser.id === user.id ? null : currentUser.friends.includes(
                user.id
              ) ? (
              <Button disabled>В друзьях</Button>
            ) : currentUser.friendRequests.includes(user.id) ? (
              <Button onClick={() => handleAcceptRequest(user.id)}>
                Принять запрос
              </Button>
            ) : (
              <Button
                icon={<PlusOutlined />}
                onClick={() => handleAddFriend(user.id)}
                disabled={user.friendRequests.includes(currentUser.id)}
              >
                {user.friendRequests.includes(currentUser.id)
                  ? "Запрос отправлен"
                  : "Добавить в друзья"}
              </Button>
            ),
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar src={user.avatar} icon={<UserOutlined />} />}
            title={<Link to={`/${user.id}`}>{user.fullname}</Link>}
            description={user.bio}
          />
        </List.Item>
      )}
    />
  );
};

export default UsersListPage;
