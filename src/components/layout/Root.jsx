import { Outlet } from "react-router-dom";
import PageContainer from "./Container/PageContainer";
import NavBar from "../Navigation/NavBar";
const Root = () => {
  return (
    <>
      <NavBar />
      <PageContainer>
        <Outlet />
      </PageContainer>
    </>
  );
};

export default Root;
