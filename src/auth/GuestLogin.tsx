import { useNavigate } from 'react-router-dom';

const GuestLogin = () => {
  const navigate = useNavigate();

  const handleGuestLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/guest-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const guestUser = await response.json();
      localStorage.setItem('guestUser', JSON.stringify(guestUser));

      navigate('/'); 
    } catch (error) {
      console.error('Guest login failed:', error);
    }
  };

  return (
    <button onClick={handleGuestLogin} className="bg-green-500 text-white p-2 rounded">
      Continue as Guest
    </button>
  );
};

export default GuestLogin;
