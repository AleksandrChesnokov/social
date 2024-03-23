import { makeAutoObservable } from "mobx";

class Posts {
  posts = {
    1: {
      id: 1,
      authorId: 1,
      text: "Привет, друзья! Как ваши выходные?",
      timestamp: new Date("2024-03-14T18:00:00").toLocaleString("ru"),
      comments: [],
    },
  };

  constructor() {
    makeAutoObservable(this);
  }
  addPost = (authorId, text, newPostId) => {
    const timestamp = new Date().toLocaleString("ru");
    const newPost = {
      id: newPostId,
      authorId,
      text,
      timestamp,
      comments: [],
    };
    this.posts[newPostId] = newPost;
  };
  addCommentToPost = (postId, comment) => {
    this.posts[postId].comments.push(comment);
  };
}
export default new Posts();
