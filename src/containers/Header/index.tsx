import { useQuery } from "@apollo/client";
import useAuth from "@/hooks/useAuth";
import { GET_USER } from "@/services/InterviewQuery";
import Header from "@/components/Header";
import { Spinner } from "@/components/Spinner";
import { Sidebar } from "lucide-react";

const useHeader = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    isGuest,
    isFirebaseAuthenticated,
    isOAuthAuthenticated,
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
  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <Header
      data={data ?? null}
      isLoading={isLoading}
      isAuthenticated={isAuthenticated}
      isOAuthAuthenticated={isOAuthAuthenticated}
      isFirebaseAuthenticated={isFirebaseAuthenticated}
      isGuest={isGuest}
    />
  );
};

export default useHeader;
