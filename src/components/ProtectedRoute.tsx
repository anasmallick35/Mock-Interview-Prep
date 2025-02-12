
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

const GET_USER_ROLE = gql`
  query GetUserRole($userId: String!) {
    users_by_pk(id: $userId) {
      role
    }
  }
`;

const ProtectedRoute: React.FC<{ adminOnly?: string }> = ({ adminOnly }) => {
  const { isAuthenticated, isLoading, user } = useAuth0();
  const { data, loading } = useQuery(GET_USER_ROLE, {
    variables: { userId: user?.sub },
    skip: !isAuthenticated,
  });

  if (isLoading || loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && data?.users_by_pk.role !== 'admin') {
    alert('Permission denied')
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;