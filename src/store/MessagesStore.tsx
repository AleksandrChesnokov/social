import { makeAutoObservable } from "mobx";

class MessagesStore {
  messageData = {
    1: {
      id: 1,
      senderId: 1,
      recipientId: 2,
      text: "Привет, Ирина! Как дела?",
      timestamp: new Date("2024-03-15T09:30:00").toLocaleString("ru"),
    },
    2: {
      id: 2,
      senderId: 2,
      recipientId: 1,
      text: "Привет, Иван! У меня все отлично, спасибо!",
      timestamp: new Date("2024-03-15T09:35:00").toLocaleString("ru"),
    },
    3: {
      id: 3,
      senderId: 3,
      recipientId: 1,
      text: "Привет, Иван! Что сегодня делаешь?",
      timestamp: new Date("2024-04-15T09:35:00").toLocaleString("ru"),
    },
  };

  constructor() {
    makeAutoObservable(this);
  }
  addMessage = (newMessage) => {
    const messageId = Object.keys(this.messageData).length + 1;
    const timestamp = new Date().toLocaleString("ru");
    const message = { ...newMessage, id: messageId, timestamp: timestamp };
    this.messageData[messageId] = message;
  };
}
export default new MessagesStore();
