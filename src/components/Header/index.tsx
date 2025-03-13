import { Link } from "react-router-dom";
import { Spinner } from "../Spinner";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "../DropdownMenu";
import FirebaseLogout from "@/Auth/firebase-auth/Logout";
interface HeaderProps {
  data: any;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const Header: React.FC<HeaderProps> = ({
  data,
  isLoading,
  isAuthenticated,
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
  <nav className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-2 sm:py-4 flex flex-col sm:flex-row justify-between items-center">
    <Link
      to="/"
      className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2 sm:mb-0"
    >
      CrackTogether
    </Link>
    <div className="flex flex-wrap gap-2 justify-center sm:justify-end">
      {isAuthenticated ? (
        <>
          {data?.users_by_pk?.role === "admin" && (
            <FirebaseLogout/>
          )}
          {data?.users_by_pk?.role !== "admin" && (
            <>
              <div className="flex items-center space-x-2 bg-yellow-100 p-2 sm:p-3 rounded-xl shadow-sm cursor-pointer hover:bg-yellow-200 transition-colors">
                <FontAwesomeIcon icon={faCoins} className="text-yellow-600" />
                <span className="text-yellow-800 font-bold text-sm">
                  {data?.users_by_pk?.points}
                </span>
              </div>
              <Link to="/user-contributions">
                <Button className="text-sm sm:text-base">Your Contribution</Button>
              </Link>
              <Dropdown/>
            </>
          )}
        </>
      ) : (
        <>
          <Link to="/guest-login">
            <Button className="text-sm sm:text-base">Guest Login</Button>
          </Link>
        </>
      )}
    </div>
  </nav>
</header>
  );
};

export default Header;
