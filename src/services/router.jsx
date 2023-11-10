import { createBrowserRouter } from "react-router-dom";
import Home from "../components/views/Home/Home";
import Root from "../components/layout/Root";
import AuthChecker from "../components/layout/Checker/AuthChecker";
import SignIn from "../components/views/Auth/Sign/SignIn";
import SignUp from "../components/views/Auth/Sign/SignUp";
import { UserProvider } from "../context/UserProvider";
import UserProfileEdit from "../components/views/Private/Profile/UserProfileEdit";
import CreateAnnonces from "../components/views/Private/Profile/Annonces/CreateAnnonces";
import PrivateAnnonces from "../components/views/Private/Profile/Annonces/PrivateAnnonces";
import AnnoncePage from "../components/views/Explore/AnnoncePage";

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
            element: <UserProfileEdit />,
          },
          {
            path: "annonces/create-annonces",
            element: <CreateAnnonces />,
          },
          {
            path: "annonces/my-annonces",
            element: <PrivateAnnonces />,
          },
        ],
      },
    ],
  },
]);
