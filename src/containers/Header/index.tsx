import { useQuery } from "@apollo/client";
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
    />
  );
};

export default useHeader;
