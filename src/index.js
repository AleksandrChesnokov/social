import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { NewsFeedPage } from "./Components/Pages/NewsFeedPage.tsx";
import { UserProfilePage } from "./Components/Pages/UserProfilePage.tsx";
import { FriendListPage } from "./Components/Pages/FriendListPage.tsx";
import { ChatListPage } from "./Components/Pages/ChatListPage.tsx";
import { ChatWindowPage } from "./Components/Pages/ChatWindowPage.tsx";
import AuthPage from "./Components/Pages/AuthPage.tsx";
import UsersListPage from "./Components/Pages/UsersListPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader() {
      let s = localStorage.getItem("userId");
      if (!s) return redirect("/auth");
      return null;
    },
    children: [
      {
        index: true,
        element: <UserProfilePage />,
      },
      {
        path: "users",
        element: <UsersListPage />,
      },
      {
        path: "news",
        element: <NewsFeedPage />,
      },
      {
        path: "friend",
        element: <FriendListPage />,
      },
      {
        path: "/:id",
        element: <UserProfilePage />,
      },
      {
        path: "messages",
        element: <ChatListPage />,
      },
      {
        path: "messages/:id",
        element: <ChatWindowPage />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthPage />,
    loader() {
      let s = localStorage.getItem("userId");
      if (s) return redirect("/");
      return null;
    },
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
