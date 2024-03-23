import React from "react";
import { List, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import UsersStore from "../../store/UsersStore.tsx";
import MessagesStore from "../../store/MessagesStore.tsx";

export const ChatListPage = observer(() => {
  const { users } = UsersStore;
  const { messageData } = MessagesStore;
  const currentUserId = localStorage.getItem("userId") || "";
  const currentUser = users[currentUserId].id;

  let myFriendIds = users[currentUserId].messages.map((i) =>
    messageData[i].senderId === users[currentUserId].id
      ? messageData[i].recipientId
      : messageData[i].senderId
  );
  let friendIdsSet: number[] = Array.from(new Set(myFriendIds));

  const getLastMessage = (userId) => {
    const userMessages = users[userId].messages;
    const filterFrinend = userMessages.filter(
      (i) =>
        messageData[i].senderId === users[currentUserId].id ||
        messageData[i].recipientId === users[currentUserId].id
    );
    if (userMessages.length === 0) return null;
    const lastMessageId = filterFrinend[filterFrinend.length - 1];
    return messageData[lastMessageId];
  };

  let friendsWithLastMessage = friendIdsSet.map((user) => ({
    ...users[user],
    lastMessage: getLastMessage(user),
  }));
  return (
    <List
      style={{ backgroundColor: "white", padding: "10px", borderRadius: 8 }}
      locale={{ emptyText: "Пусто" }}
      itemLayout="horizontal"
      split={true}
      dataSource={friendsWithLastMessage}
      renderItem={(person) => (
        <Link to={`/messages/${person.id}`}>
          <List.Item actions={[<div>{person.lastMessage.timestamp}</div>]}>
            <List.Item.Meta
              style={{ alignItems: "flex-end" }}
              avatar={
                <Avatar
                  src={users[person.lastMessage.senderId].avatar}
                  icon={<UserOutlined />}
                />
              }
              title={person.fullname}
              description={
                currentUser === users[person.lastMessage.senderId]?.id
                  ? `Вы: ${person.lastMessage.text}`
                  : person.lastMessage.text
              }
            />
          </List.Item>
        </Link>
      )}
    />
  );
});
