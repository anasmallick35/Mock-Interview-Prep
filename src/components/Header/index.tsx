import { Link } from "react-router-dom";
import Logout from "@/Auth/O-Auth/Logout";
import FirebaseLogout from "@/Auth/firebase-auth/Logout";
import { Spinner } from "../Spinner";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";

interface HeaderProps {
  data: any;
  isLoading: boolean;
  isAuthenticated: boolean;
  isFirebaseAuthenticated: boolean;
  isOAuthAuthenticated: boolean;
  isGuest: boolean;
}

const Header: React.FC<HeaderProps> = ({
  data,
  isLoading,
  isAuthenticated,
  isFirebaseAuthenticated,
  isOAuthAuthenticated,
  isGuest,
}) => {
  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }
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
              {(isOAuthAuthenticated || isGuest) && <Logout />}
              {data?.users_by_pk?.role === "admin" && (
                <Link
                  to="/admin"
                  className="bg-slate-500 text-white p-2 rounded"
                >
                  Admin Dashboard
                </Link>
              )}
              {data?.users_by_pk?.role !== "admin" && (
                <>
                <div className="flex items-center space-x-2 bg-yellow-100 p-3 rounded-xl shadow-sm cursor-pointer hover:bg-yellow-200 transition-colors">
                  <FontAwesomeIcon icon={faCoins} className="text-yellow-600" />
                  <span className="text-yellow-800 font-bold text-sm">
                    {data?.users_by_pk?.points}
                  </span>
                </div>
                <Link to="/user-contributions">
                <Button>Your Contribution</Button>
              </Link>
              </>
              )}
              <Link to="/profile">
                <img
                  className="w-10 h-10 rounded-full object-cover border-2 border-white"
                  src={data?.users_by_pk?.picture}
                />
              </Link>
            </>
          ) : (
            <>
              <Link to="/guest-login">
                <Button>Guest Login</Button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;