import menu from "../../utils/sidebarData";
import FirebaseLogout from "@/Auth/firebase-auth/Logout";
import SidebarItem from "./SidebarItem";
import useAuth from "@/hooks/useAuth";


const Sidebar = () => {
    const { isFirebaseAuthenticated } = useAuth();   
  
    return (
        <div className="fixed top-0 left-0 w-64 h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col">
          <div className="flex items-center p-4 bg-blue-200 h-20">
            <div className="text-2xl font-bold text-blue-900">CrackTogether</div>
          </div>
    
          <div className="flex-grow mt-4">
            {isFirebaseAuthenticated && (menu
              .filter((item) => item.title !== "Logout")
              .map((item, index) => (
                <SidebarItem key={index} item={item} />
              )))}
          </div>
    {isFirebaseAuthenticated &&(<div className="mt-auto mb-4">
            <FirebaseLogout />
          </div>)}
          
        </div>
    );
};

export default Sidebar;
