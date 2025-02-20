import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const GuestLogin = () => {
  const navigate = useNavigate();
  const { setIsGuest } = useAuth();

  const handleGuestLogin = () => {
    setIsGuest(true);
    localStorage.setItem("isGuest", "true"); 
    navigate('/');
  };

  return (
    <button onClick={handleGuestLogin} className="bg-green-500 text-white p-2 rounded">
      Continue as Guest
    </button>
  );
};

export default GuestLogin;
