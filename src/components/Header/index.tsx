import { Link,useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import Login from "@/auth/Login";
import Logout from "@/auth/Logout";
import FirebaseLogout from "@/firebase-auth/Logout";
import { GET_USER } from "@/services/InterviewQuery";
import { useQuery } from "@apollo/client";
import { Spinner } from "../Spinner";

const Header = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    isGuest,
    isFirebaseAuthenticated,
    isOAuthAuthenticated,
  } = useAuth();

  const { data } = useQuery(GET_USER, {
    variables: { userId: isFirebaseAuthenticated ? user?.uid : user?.sub },
    skip: !isAuthenticated,
  });
  const navigate = useNavigate();
  if (isLoading) {
    return <div><Spinner/></div>;
  }

  const handleGuestLoginClick = () => {
    navigate("/");
  };

  return (
    <header className="sticky top-0 bg-white shadow-md dark:bg-gray-900 dark:text-white z-50">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 dark:text-blue-400"
        >
          CrackTogether
        </Link>
        <div className="flex gap-2">
          {isAuthenticated ? (
            <>
              {isFirebaseAuthenticated && <FirebaseLogout />}
              {isOAuthAuthenticated && <Logout />}
              <Link to="/profile">
                <img
                  className="w-10 h-10 rounded-full object-cover border-2 border-white"
                  src={data?.users_by_pk?.picture}
                />
              </Link>
              {data?.users_by_pk.role === 'admin' && <Link to = '/admin'>Admin Dashboard</Link>}
            </>
          ) : isGuest ? (
            <button onClick={handleGuestLoginClick}>Login</button>
          ) : (
            <>
              <Login />
              <Link to="/firebase-login">
                <button>Firebase Login</button>
              </Link>
              <Link to="/firebase-signup">
                <button>Firebase Signup</button>
              </Link>
              <Link to = "/guest-login"><button>Guest Login</button></Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
