import { Outlet } from "react-router-dom";
import Header from "@/containers/Header";
import Sidebar from "../Sidebar";

const Layout = () => {
  return (
    <div className="flex h-screen">
      <div className="w-64 bg-gray-800 text-white">
        <Sidebar />
      </div>
      <div className="flex-1 p-4 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
