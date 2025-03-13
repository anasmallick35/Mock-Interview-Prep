import { auth } from "@/utils/firebase";


const FirebaseLogout = () => {

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error(error);
    }
  };

  return <div onClick={handleLogout}>Log Out</div>;
};

export default FirebaseLogout;