
import { Navigate, Outlet } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Spinner } from "@/components/Spinner";
import { GET_USER } from "@/services/InterviewQuery";
import useAuth from "@/hooks/useAuth";

const RoleBasedRouter = () => {
  const { user, isAuthenticated, isLoading, isGuest } = useAuth();

  const { data, loading } = useQuery(GET_USER, {
    variables: { userId: user?.sub || user?.uid },
    skip: !isAuthenticated,
  });

  if (isLoading || loading) return <Spinner />;

  if (!isAuthenticated && !isGuest) return <Navigate to="/log-in" />;

  const role = data?.users_by_pk?.role;

  if (role === "admin") {
    return  <Navigate to="/admin" />;

  }

  return <Outlet />;
};

export default RoleBasedRouter;
