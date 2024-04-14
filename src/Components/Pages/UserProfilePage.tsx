import React, { useState } from "react";
import { Space } from "antd";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import UsersStore from "../../store/UsersStore.tsx";
import PostsStore from "../../store/PostsStore.tsx";
import { UserProfile } from "../Widgets/UserProfile.tsx";
import { FriendsList } from "../Widgets/FriendsList.tsx";
import { UserPosts } from "../Widgets/UserPosts.tsx";
import { CommentsModal } from "../Widgets/CommentsModal.tsx";
import { NewPostInput } from "../Widgets/NewPostInput.tsx";

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  profileId: number;
  friends: number[];
  posts: number[];
}

interface Post {
  id: number;
  userId: number;
  content: string;
  comments: Comment[];
}

interface Comment {
  id: number;
  userId: number;
  content: string;
}

export const UserProfilePage = observer(() => {
  const { id } = useParams();
  const { users } = UsersStore;
  const { posts, addCommentToPost } = PostsStore;
  const currentUserId = localStorage.getItem("userId") || "";
  const selectedUser: User | undefined = users[id || currentUserId];
  const [commentContent, setCommentContent] = useState<string>("");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  if (!selectedUser) {
    return <div>Такого пользователя нет</div>;
  }

  // Формирование списка друзей и постов выбранного пользователя
  const userFriends: User[] | null = selectedUser
    ? selectedUser.friends.map((i) => users[i])
    : null;
  const userPosts: Post[] | null = selectedUser
    ? selectedUser.posts.map((i) => posts[i])
    : null;

  // Проверка, является ли выбранный пользователь другом текущего пользователя
  const isFriendOfCurrentUser: boolean | null = selectedUser
    ? users[currentUserId].friends.includes(selectedUser.id)
    : null;

  // Проверка, является ли выбранный пользователь текущим пользователем
  const isCurrentUser: boolean = selectedUser === users[currentUserId];

  // Обработчик изменения в поле ввода комментария
  const handleCommentInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCommentContent(e.target.value);
  };

  // Обработчик клика по посту
  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    setComments(post.comments || []);
    setIsModalVisible(true);
  };

  // Обработчик добавления комментария
  const handleAddComment = () => {
    if (commentContent.trim() === "") return;
    const newComment: Comment = {
      id: comments.length + 1,
      userId: parseInt(currentUserId),
      content: commentContent,
    };
    addCommentToPost(selectedPost!.id, newComment);
    setCommentContent("");
  };

  // Обработчик закрытия модального окна
  const handleCancel = () => {
    setSelectedPost(null);
    setIsModalVisible(false);
  };

  return (
    <Space direction="vertical" size="middle" style={{ display: "flex" }}>
      <UserProfile selectedUser={selectedUser} />
      <FriendsList userFriends={userFriends || []} />
      {isCurrentUser && <NewPostInput currentUserId={currentUserId} />}
      <UserPosts
        userPosts={userPosts || []}
        handlePostClick={handlePostClick}
        users={users}
      />
      <CommentsModal
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        handleAddComment={handleAddComment}
        comments={comments}
        selectedPost={selectedPost}
        commentContent={commentContent}
        handleCommentInputChange={handleCommentInputChange}
        users={users}
      />
    </Space>
  );
});
