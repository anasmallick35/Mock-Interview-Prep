import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import FirebaseLogout from "@/Auth/firebase-auth/Logout";
import Logout from "@/Auth/O-Auth/Logout";
import { useQuery } from "@apollo/client";
import { GET_USER } from "@/services/InterviewQuery";
import { Spinner } from "../Spinner";

interface DropdownProps {
  showContributionButton?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({ showContributionButton = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const {
    isAuthenticated,
    user,
    isFirebaseAuthenticated,
    isOAuthAuthenticated,
    isGuest,
    isLoading,
  } = useAuth();

  const guestId = import.meta.env.VITE_GUEST_ID;

  const { data } = useQuery(GET_USER, {
    variables: {
      userId: isFirebaseAuthenticated
        ? user?.uid
        : isGuest
        ? guestId
        : user?.sub,
    },
    skip: !isAuthenticated,
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <img
        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-white cursor-pointer transition-transform duration-200 hover:scale-105"
        src={data?.users_by_pk?.picture}
        onClick={() => setIsOpen((prev) => !prev)}
      />

      {isOpen && (
        <div
          id="dropdownDivider"
          className="absolute top-full right-2 mt-3 w-48 max-w-[95vw] bg-white dark:bg-gray-800 shadow-xl rounded-xl z-50 divide-y divide-gray-200 dark:divide-gray-700 animate-fade-in"
        >
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            <li>
              <Link
                to="profile"
                className="block px-4 py-2 text-[16px] hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                Profile
              </Link>
            </li>
            {showContributionButton && (
              <li className="sm:hidden">
                <Link
                  to="/user-contributions"
                  className="block px-4 py-2 text-[16px] hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  Your Contribution
                </Link>
              </li>
            )}
          </ul>
          <div
            className="px-4 py-2 text-[16px] text-black dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            {isFirebaseAuthenticated && <FirebaseLogout />}
            {(isOAuthAuthenticated || isGuest) && <Logout />}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;