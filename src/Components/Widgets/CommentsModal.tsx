import React from "react";
import { Modal, Button, List, Avatar, Form, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";

export const CommentsModal = ({
  isModalVisible,
  handleCancel,
  handleAddComment,
  comments,
  selectedPost,
  commentContent,
  handleCommentInputChange,
  users,
}) => {
  return (
    <Modal
      title="Комментарии"
      open={isModalVisible}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Закрыть
        </Button>,
        <Button key="addComment" type="primary" onClick={handleAddComment}>
          Добавить комментарий
        </Button>,
      ]}
    >
      {selectedPost && (
        <List
          locale={{ emptyText: "Пусто" }}
          dataSource={comments}
          renderItem={(comment) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={users[comment.userId].avatar}
                    icon={<UserOutlined />}
                  />
                }
                title={users[comment.userId].fullname}
                description={comment.content}
              />
            </List.Item>
          )}
        />
      )}
      {selectedPost && (
        <Form.Item>
          <Input.TextArea
            value={commentContent}
            onChange={handleCommentInputChange}
            placeholder="Введите комментарий"
            autoSize={{ minRows: 2 }}
          />
        </Form.Item>
      )}
    </Modal>
  );
};
