import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import useAuth from "@/hooks/useAuth";
import Button from "@/components/Button";

const Logout: React.FC = () => {
  const { logout } = useAuth0();
  const { setIsGuest } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("isGuest");
    setIsGuest(false);
    window.dispatchEvent(new Event("localStorageChange"));
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return (
    <Button
      onClick={handleLogout}
      className=" text-black p-2 rounded"
    >
      Log Out
    </Button>
  );
};

export default Logout;
