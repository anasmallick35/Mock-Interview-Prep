
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/utils/firebase";
import Home from "@/pages/Home";

const useHomeLogic = () => {
  const [_firebaseUser, firebaseLoading, firebaseError] = useAuthState(auth);

  //const isGuestMode = !isAuthenticated && !firebaseUser;

  return (
    <Home
      firebaseLoading={firebaseLoading}
      firebaseError={firebaseError}
    />
  );
};

export default useHomeLogic;
