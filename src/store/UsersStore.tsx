import { makeAutoObservable } from "mobx";

class UsersStore {
  users = {
    1: {
      id: 1,
      username: "Jilos",
      email: "Jilos@mail.ru",
      password: "password1",
      profileId: 1,
      friends: [2, 3],
      posts: [1],
      messages: [1, 2, 3],
      avatar: "https://randomuser.me/api/portraits/med/men/94.jpg",
      bio: "Frontend developer",
      location: "Москва, Россия",
      birthday: new Date("1990-01-01"),
      gender: "male",
      interests: ["React", "JavaScript", "Web Development"],
      fullname: "Иван Петров",
      online: false,
      friendRequests: [],
    },
    2: {
      id: 2,
      username: "IrinaH",
      email: "IrinaH@mail.ru",
      password: "Password2",
      profileId: 2,
      friends: [1],
      posts: [],
      messages: [1, 2],
      avatar: "https://randomuser.me/api/portraits/med/women/51.jpg",
      bio: "Архитектор со страстью к созданию уникальных и функциональных архитектурных решений.",
      location: "Пермь, Россия",
      birthday: new Date("1995-03-09"),
      gender: "female",
      interests: ["Кино", "Литература", "Кулинария"],
      fullname: "Ирина Глухова",
      online: true,
      friendRequests: [],
    },
    3: {
      id: 3,
      username: "grido",
      email: "grido@mail.ru",
      password: "Password3",
      profileId: 3,
      friends: [1],
      posts: [],
      messages: [3],
      avatar: "https://randomuser.me/api/portraits/med/men/76.jpg",
      bio: "Фотограф, исследующий красоту мира через объектив камеры.",
      location: "Энгельс, Россия",
      birthday: new Date("1993-09-02"),
      gender: "male",
      interests: ["Искусство", "Музыка", "Театр"],
      fullname: "Алексей Дударев",
      online: true,
      friendRequests: [],
    },
  };

  constructor() {
    makeAutoObservable(this);
  }
  addMessageToUsers = (senderId, recipientId, messageId) => {
    this.users[senderId].messages.push(messageId);
    this.users[recipientId].messages.push(messageId);
  };
  removeFriend = (userId, friendId) => {
    if (this.users[userId] && this.users[friendId]) {
      this.users[userId].friends = this.users[userId].friends.filter(
        (id) => id !== friendId
      );
      this.users[friendId].friends = this.users[friendId].friends.filter(
        (id) => id !== userId
      );
    }
  };
  registerUser = (userData) => {
    const { username, email, password, bio, fullname } = userData;
    if (this.findUserByEmail(email)) {
      return {
        success: false,
        message: "Пользователь с таким email уже есть.",
      };
    }

    const newUser = {
      id: this.generateUserId(),
      username,
      email,
      password,
      profileId: this.generateUserId(),
      friends: [],
      posts: [],
      messages: [],
      avatar: "",
      bio,
      location: "",
      birthday: null,
      gender: "",
      interests: [""],
      fullname,
      online: false,
      friendRequests: [],
    };
    this.users[newUser.id] = newUser;
    return { success: true, message: "Вы успешно зарегистрировались!" };
  };

  setUserOfflineStatus = (currentUserId) => {
    this.users[currentUserId].online = false;
  };
  findUserByEmail = (email) => {
    return Object.values(this.users).find((user) => user.email === email);
  };
  generateUserId = () => {
    return Object.keys(this.users).length + 1;
  };
  addPostId = (postId, userId) => {
    this.users[userId].posts.push(postId);
  };
  addFriendRequest = (fromUserId, toUserId) => {
    this.users[toUserId].friendRequests.push(fromUserId);
  };

  acceptFriendRequest = (fromUserId, toUserId) => {
    this.users[fromUserId].friends.push(toUserId);
    this.users[toUserId].friends.push(fromUserId);
    this.users[fromUserId].friendRequests = this.users[
      fromUserId
    ].friendRequests.filter((requestId) => requestId !== toUserId);
  };
}
export default new UsersStore();
