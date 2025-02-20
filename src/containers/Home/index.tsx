import { useAuth0 } from "@auth0/auth0-react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/utils/firebase";
import Home from "@/pages/Home";

const useHomeLogic = () => {
  const { isAuthenticated } = useAuth0();
  const [firebaseUser, firebaseLoading, firebaseError] = useAuthState(auth);

  const isGuestMode = !isAuthenticated && !firebaseUser;

  return (
    <Home
      firebaseLoading={firebaseLoading}
      firebaseError={firebaseError}
      isGuestMode={isGuestMode}
    />
  );
};

export default useHomeLogic;
