import React from "react";
import { List, Space, Divider } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";

export const UserPosts = observer(({ userPosts, handlePostClick, users }) => {
  return (
    <List
      locale={{ emptyText: "Пусто" }}
      style={{ backgroundColor: "white", borderRadius: 8, padding: "10px" }}
      header={<h3>Все записи</h3>}
      dataSource={userPosts}
      renderItem={(post) => (
        <List.Item
          onClick={() => handlePostClick(post)}
          extra={
            <div>
              {post.comments.length > 0 ? post.comments.length : 0}{" "}
              <MessageOutlined />
            </div>
          }
        >
          <List.Item.Meta
            title={<div>{post.text}</div>}
            description={
              <Space>
                <span>{users[post.authorId].fullname}</span>
                <Divider type="vertical" />
                <span>{post.timestamp}</span>
              </Space>
            }
          />
        </List.Item>
      )}
    />
  );
});
