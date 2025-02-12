
import  { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from '@apollo/client';

import { GET_USER_ROLE } from '@/services/InterviewQuery';


const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  const [userRole, setUserRole] = useState<string | null>(null);

  const { data, loading, error } = useQuery(GET_USER_ROLE, {
    variables: { userId: user?.sub },
    skip: !isAuthenticated,
  });

  useEffect(() => {
    if (data) {
      setUserRole(data.users_by_pk.role);
    }
  }, [data]);


  if (!isAuthenticated || !user) {
    return <div>Not authenticated</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching user role</div>;
  }
  let users = data.users_by_pk;
  console.log(users)

  return (
    <div>
      <img src={users.picture} alt={users.name} />
      <h2>{users.name}</h2>
      <p>{users.email}</p>
      <p>Role : {userRole}</p>
      {/*<p>{user?.sub}</p>*/}
    </div>
  );
};

export default Profile;