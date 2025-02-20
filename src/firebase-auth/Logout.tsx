import { auth } from "../utils/firebase";


const FirebaseLogout = () => {

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error(error);
    }
  };

  return <button onClick={handleLogout}>Log Out</button>;
};

export default FirebaseLogout;