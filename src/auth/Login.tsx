import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <>
      <button
        onClick={() => loginWithRedirect()}
        className= "text-blue-500 p-2 rounded"
      >
        OAuth Login
      </button>
    </>
  );
};

export default Login;
