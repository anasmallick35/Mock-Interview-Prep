import { ReactNode } from "react";
import { FaTh, FaRegChartBar, FaCommentAlt } from "react-icons/fa";
import { BiImageAdd } from "react-icons/bi";

export interface MenuItem {
  title: string;
  icon?: ReactNode;
  path?: string;
  childrens?: MenuItem[];
}

const menu: MenuItem[] = [
  {
    title: "Dashboard",
    path: "/",
  },
  {
    title: "Playground",
    path: "/take-interview",
  },
  {
    title: "Profile",
    path: "/profile",
  },
  {
    title: "Your Contributions",
    path: "/user-contributions",
  },
  {
    title: "Logout",
    path: "/logout",
  },
  {
    title: "Your Interviews",
    path:"past-interviews"
  }

];

export default menu;
