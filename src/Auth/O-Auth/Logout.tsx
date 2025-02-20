import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Logout: React.FC = () => {
  const { logout } = useAuth0();

  return (
    <button
      onClick={() =>
        logout({
          logoutParams: { returnTo: window.location.origin },
        })
      }
      className="bg-red-500 text-white p-2 rounded"
    >
      Log Out
    </button>
  );
};

export default Logout;
