import { createBrowserRouter } from "react-router-dom";
import Home from "../components/views/Home/Home";
import Root from "../components/layout/Root";
import AuthChecker from "../components/layout/Checker/AuthChecker";
import Profile from "../components/views/Private/Profile/Profile";
import SignIn from "../components/views/Auth/Sign/SignIn";
import SignUp from "../components/views/Auth/Sign/SignUp";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/private",
        element: <AuthChecker />,
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
        ],
      },
    ],
  },
]);
