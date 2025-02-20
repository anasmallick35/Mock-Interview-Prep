import { Outlet } from "react-router-dom";
import Header from "@/containers/Header";

const Layout = () => {
  return (
    <>
      <Header/>
      <Outlet />
    </>
  );
};

export default Layout;