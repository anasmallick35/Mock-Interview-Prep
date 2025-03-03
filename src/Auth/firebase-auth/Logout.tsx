import { auth } from "../../utils/firebase";

const FirebaseLogout = () => {
  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      onClick={handleLogout}
      className="w-full py-2 px-4 bg-slate-500 text-white font-semibold  hover:bg-red-600 transition-all duration-300"
    >
      Log Out
    </div>
  );
};

export default FirebaseLogout;
