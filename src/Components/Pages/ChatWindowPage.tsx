import React, { useState, useRef, useEffect } from "react";
import { List, Avatar, Input, Button } from "antd";
import { observer } from "mobx-react-lite";
import { useParams, Link } from "react-router-dom";
import UsersStore from "../../store/UsersStore.tsx";
import MessagesStore from "../../store/MessagesStore.tsx";

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
}

interface Message {
  id: number;
  senderId: number;
  recipientId: number;
  text: string;
  timestamp: string;
}

export const ChatWindowPage = observer(() => {
  const { id } = useParams();
  const { users, addMessageToUsers } = UsersStore;
  const { messageData, addMessage } = MessagesStore;
  const currentUserId = localStorage.getItem("userId") || "";
  const currentUser: User | undefined = users[currentUserId];
  const recipientUser: User | undefined = users[id];
  const messageLength = Object.keys(messageData).length + 1;

  function compareMessages(
    currentUser: User | undefined,
    recipientUser: User | undefined
  ): Message[] {
    const mergedMessages: Message[] = [];
    if (currentUser !== undefined && recipientUser !== undefined) {
      const currentUserMessages = currentUser.messages;
      const recipientUserMessages = recipientUser.messages;
      const currentUserMessagesSet = new Set(currentUserMessages);
      const recipientUserMessagesSet = new Set(recipientUserMessages);
      currentUserMessagesSet.forEach((messageId) => {
        if (recipientUserMessagesSet.has(messageId)) {
          mergedMessages.push(messageData[messageId]);
        }
      });
    }
    return mergedMessages;
  }
  let mergedMessages: Message[] = compareMessages(currentUser, recipientUser);

  const [newMessage, setNewMessage] = useState<string>("");
  const messagesListRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    if (messagesListRef.current !== null) {
      messagesListRef.current.scrollTop = messagesListRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [mergedMessages]);

  const handleSendMessage = () => {
    if (
      currentUser !== undefined &&
      recipientUser !== undefined &&
      inputRef.current !== null
    ) {
      if (newMessage.trim() === "") return;
      const newMessageObject: Message = {
        id: messageLength,
        senderId: currentUser.id,
        recipientId: recipientUser.id,
        text: newMessage,
        timestamp: new Date().toISOString(),
      };
      addMessage(newMessageObject);
      addMessageToUsers(currentUser.id, recipientUser.id, messageLength);

      setNewMessage("");
      inputRef.current.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 64px)",
      }}
    >
      <div
        ref={messagesListRef}
        style={{
          padding: "10px",
          backgroundColor: "white",
          borderRadius: 8,
          flex: "1 1",
          overflowY: "scroll",
        }}
      >
        <List
          itemLayout="horizontal"
          locale={{ emptyText: "Пусто" }}
          dataSource={mergedMessages}
          renderItem={(item: Message) => (
            <List.Item actions={[item.timestamp]}>
              <List.Item.Meta
                avatar={<Avatar src={users[item.senderId].avatar} />}
                title={
                  <Link to={`/${item.senderId}`}>
                    {users[item.senderId].fullname}
                  </Link>
                }
                description={item.text}
              />
            </List.Item>
          )}
        />
      </div>
      <div style={{ marginTop: "20px" }}>
        <Input.TextArea
          autoSize={{ minRows: 4 }}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          ref={inputRef}
        />
        <Button type="primary" onClick={handleSendMessage}>
          Отправить сообщение
        </Button>
      </div>
    </div>
  );
});
