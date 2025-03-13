import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import FirebaseLogout from "@/Auth/firebase-auth/Logout";
import Logout from "@/Auth/O-Auth/Logout";
import { useQuery } from "@apollo/client";
import { GET_USER } from "@/services/InterviewQuery";
import { Spinner } from "../Spinner";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated, user, isFirebaseAuthenticated, isOAuthAuthenticated, isGuest, isLoading } = useAuth()
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
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <img
        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-white cursor-pointer"
        src={data?.users_by_pk?.picture}
        onClick={() => setIsOpen(!isOpen)}
        alt="Profile"
      />

  
      {isOpen && (
        <div
          id="dropdownDivider"
          className="absolute left-0 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700 dark:divide-gray-600 z-50"
        >
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            <li>
              <Link
                to="profile"
                className="block px-4 py-2 text-[16px] text-black hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ml-1"
                onClick={() => setIsOpen(false)}
              >
                Profile
              </Link>
            </li>
          </ul>
          <div className="block px-4 py-2 text-[16px] text-black hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ml-1 font-semibold cursor-pointer" onClick={() => setIsOpen(false)}>
            {isFirebaseAuthenticated && <FirebaseLogout />}
            {(isOAuthAuthenticated || isGuest) && <Logout />}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;