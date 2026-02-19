import React from "react";
import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Theme from "../pages/Theme";
import Profile from "../pages/Profile";
import ChatRoom from "../pages/ChatRoom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/theme",
    element: <Theme />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/chat-room",
    element: <ChatRoom />,
  },
]);

export default router;
