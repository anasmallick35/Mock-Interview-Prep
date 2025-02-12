
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Signup: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  const handleSignup = () => {
    loginWithRedirect({
      authorizationParams: {
        screen_hint: 'signup', 
      },
    });
  };

  return (
    <button
      onClick={handleSignup}
      className="bg-green-500 text-white p-2 rounded"
    >
      Sign Up
    </button>
  );
};

export default Signup;