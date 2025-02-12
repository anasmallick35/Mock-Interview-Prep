
import { useAuth0 } from '@auth0/auth0-react';

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      onClick={() => loginWithRedirect()}
      className="bg-blue-500 text-white p-2 rounded"
    >
      Log In
    </button>
  );
};

export default Login;