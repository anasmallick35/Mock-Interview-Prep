import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { toast } from "sonner";
import Button from "@/components/Button";

const GuestLogin = () => {
  const navigate = useNavigate();
  const { setIsGuest } = useAuth();

  const handleGuestLogin = () => {
    localStorage.setItem("isGuest", "true");
    setIsGuest(true);

    window.dispatchEvent(new Event("localStorageChange"));

    toast.success("Logged in as Guest");
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Guest Login</h2>
        <p className="mb-6">You are logging in as a guest. Some features will be restricted.</p>
        <Button
          onClick={handleGuestLogin}
          className="bg-slate-400 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Continue as Guest
        </Button>
      </div>
    </div>
  );
};

export default GuestLogin;