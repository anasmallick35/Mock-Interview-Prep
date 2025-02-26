import { useAuth0 } from "@auth0/auth0-react";
import Button from "@/components/Button";

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <>
      <Button
        onClick={() => loginWithRedirect()}
        className="text-blue-500 p-2 rounded"
      >
        OAuth Login
      </Button>
    </>
  );
};

export default Login;
