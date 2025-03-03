import React from "react";
import { NavLink } from "react-router-dom";


interface MenuItem {
  title: string;
  path?: string;
  icon?: React.ReactNode;
  childrens?: MenuItem[];
}

interface SidebarItemProps {
  item: MenuItem;
}

const activeLink = ({ isActive }: { isActive: boolean }) =>
  isActive ? "bg-blue-200 text-blue-900" : "text-blue-800 hover:bg-blue-100";
const activeSublink = ({ isActive }: { isActive: boolean }) =>
  isActive ? "bg-blue-200 text-blue-900" : "text-blue-800 hover:bg-blue-100";

const SidebarItem: React.FC<SidebarItemProps> = ({ item }) => {
  return item.childrens ? (
    <div className="bg-blue-100">
      <div className="flex items-center p-3 cursor-pointer hover:bg-blue-100">
        {item.icon && <div className="text-blue-900">{item.icon}</div>}
        <div className="text-blue-900">{item.title}</div>
      </div>
      <div className="ml-4">
        {item.childrens.map((child, index) => (
          <NavLink key={index} to={child.path || "/"} className={activeSublink}>
            <div className="flex items-center p-3 pl-6 space-x-3">
              {child.icon && <div className="text-blue-900">{child.icon}</div>}
              <div className="text-blue-900">{child.title}</div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  ) : (
    <NavLink to={item.path || "/"} className={activeLink}>
      <div className="flex items-center p-3 space-x-3">
        {item.icon && <div className="text-blue-900">{item.icon}</div>}
        <div className="text-blue-900">{item.title}</div>
      </div>
    </NavLink>
  );
};

export default SidebarItem