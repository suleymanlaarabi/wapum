import { Outlet } from "react-router-dom";
import NavBar from "./Navigation/NavBar";

const Root = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default Root;
