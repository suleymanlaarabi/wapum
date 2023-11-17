import { createBrowserRouter } from "react-router-dom";
import Home from "../components/views/Home/Home";
import Root from "../components/layout/Root";
import AuthChecker from "../components/layout/Checker/AuthChecker";
import SignIn from "../components/views/Auth/Sign/SignIn";
import SignUp from "../components/views/Auth/Sign/SignUp";
import { UserProvider } from "../context/UserProvider";
import CreateAnnonces from "../components/views/Private/Annonces/CreateAnnonces";
import PrivateAnnonces from "../components/views/Private/Annonces/PrivateAnnonces";
import AnnoncePage from "../components/views/Explore/AnnoncePage";
import Profile from "../components/views/Private/Profile/Profile";
import Conversation from "../components/views/Private/Messages/Conversation";
import ConversationList from "../components/views/Private/Messages/ConversationList";
import Test from "../Test";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <UserProvider>
        <Root />
      </UserProvider>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/test",
        element: <Test />,
      },
      {
        path: "/annonce/:id",
        element: <AnnoncePage />,
      },
      {
        path: "/auth/sign-in",
        element: <SignIn />,
      },
      {
        path: "/auth/sign-up",
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
          {
            path: "annonces/create-annonces",
            element: <CreateAnnonces />,
          },
          {
            path: "annonces/my-annonces",
            element: <PrivateAnnonces />,
          },
          {
            path: "messages/conversation-list",
            element: <ConversationList />,
          },
          {
            path: "messages/conversation/:id",
            element: <Conversation />,
          },
        ],
      },
    ],
  },
]);
