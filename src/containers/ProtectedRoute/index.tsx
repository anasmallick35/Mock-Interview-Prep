import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { useQuery } from "@apollo/client";
import { GET_USER } from "@/services/InterviewQuery";

import { Spinner } from "@/components/Spinner";

const ProtectedRoute: React.FC<{ adminOnly?: string }> = ({ adminOnly }) => {
  const { user, isAuthenticated, isLoading, isGuest } = useAuth();

  const { data } = useQuery(GET_USER, {
    variables: { userId: user?.sub },
    skip: !isAuthenticated,
  });

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (!isAuthenticated && !isGuest) {
    return <Navigate to="/auth" />;
  }

  if (adminOnly && !data?.users_by_pk) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (adminOnly && data?.users_by_pk.role !== "admin") {
    alert("Permission denied");
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
