import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { GET_USER } from "@/services/InterviewQuery";
import Header from "@/components/Header";
import { Spinner } from "@/components/Spinner";

const useHeader = () => {
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
    <Header data={data ?? null} 
    handleGuestLoginClick = {handleGuestLoginClick}
    isLoading  = {isLoading}
    isAuthenticated = {isAuthenticated}
    isOAuthAuthenticated = {isOAuthAuthenticated}
    isFirebaseAuthenticated = {isFirebaseAuthenticated}
    isGuest = {isGuest}
    />
  );
};

export default useHeader;
