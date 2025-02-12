import { useAuth0 } from '@auth0/auth0-react';
import Login from '../auth/Login'
import Logout from '../auth/Logout';
import { GET_USER_ROLE } from '@/services/InterviewQuery';
import { useQuery } from '@apollo/client';


export default function Header() {
    const { user, isAuthenticated } = useAuth0();

    const { data, loading, error } = useQuery(GET_USER_ROLE, {
        variables: { userId: user?.sub },
        skip: !isAuthenticated,
    });

    return (
        <header className="sticky top-0 bg-white shadow-md dark:bg-gray-900 dark:text-white z-50">
            <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <a href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    CrackTogether
                </a>
                <div>
                    {isAuthenticated ? (
                        <div className='flex items-center space-x-4 gap-5'>
                            <div className="bg-red-500 text-white rounded-md hover:bg-red-600 transition">
                                <Logout />
                            </div>
                            <div>
                                {loading ? (
                                    <span className="text-gray-500">Loading...</span>
                                ) : error ? (
                                    <span className="text-red-500">Error loading profile</span>
                                ) : data?.users_by_pk ? (
                                    <a href="/profile">
                                        <img className="w-10 h-10 rounded-full object-cover border-2 border-white"
                                            src={data.users_by_pk.picture} 
                                            alt={user?.name} />
                                    </a>
                                ) : (
                                    <span className="text-gray-500">No profile found</span>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                            <Login />
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
}
