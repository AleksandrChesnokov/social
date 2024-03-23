import React, { useState } from "react";
import { Card, Form, Input } from "antd";
import PostsStore from "../../store/PostsStore.tsx";
import UsersStore from "../../store/UsersStore.tsx";
import { observer } from "mobx-react-lite";

export const NewPostInput = observer(({ currentUserId }) => {
  const [newPostContent, setNewPostContent] = useState("");
  const { posts, addPost } = PostsStore;
  const { addPostId } = UsersStore;
  const handleInputChange = (e) => {
    setNewPostContent(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAddPost();
    }
  };

  const handleAddPost = () => {
    if (newPostContent.trim() === "") return;
    const newPostId = Object.keys(posts).length + 1;
    addPostId(newPostId, currentUserId);
    addPost(currentUserId, newPostContent, newPostId);
    setNewPostContent("");
  };

  return (
    <Card>
      <Form.Item>
        <Input.TextArea
          value={newPostContent}
          onChange={handleInputChange}
          placeholder="Что нового?"
          autoSize={{ minRows: 2 }}
          onKeyDown={handleKeyPress}
        />
      </Form.Item>
    </Card>
  );
});
