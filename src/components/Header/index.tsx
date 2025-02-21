import { Link } from "react-router-dom";
import Login from "@/Auth/O-Auth/Login";
import Logout from "@/Auth/O-Auth/Logout";
import FirebaseLogout from "@/Auth/firebase-auth/Logout";
import { Spinner } from "../Spinner";


interface HeaderProps {
    data : any;
    handleGuestLoginClick:any;
    isLoading : boolean
    isAuthenticated : boolean
    isFirebaseAuthenticated:boolean
    isOAuthAuthenticated:boolean
    isGuest : boolean
  }

const Header:React.FC<HeaderProps> = ({data,handleGuestLoginClick,isLoading, isAuthenticated,isFirebaseAuthenticated, isOAuthAuthenticated,isGuest}) => {
 
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
              {isOAuthAuthenticated && <Logout />}
              {data?.users_by_pk?.role === 'admin' && <Link to = '/admin' className="bg-slate-500 text-white p-2 rounded">Admin Dashboard</Link>}
              <Link to="/profile">
                <img
                  className="w-10 h-10 rounded-full object-cover border-2 border-white"
                  src={data?.users_by_pk?.picture}
                />
              </Link>
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
