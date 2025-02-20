import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { auth } from '../utils/firebase';
import { User } from 'firebase/auth';

type AuthState = {
  user: any;
  isAuthenticated: boolean;
  isLoading: boolean;
  isGuest: boolean;
  setIsGuest: React.Dispatch<React.SetStateAction<boolean>>;
  isFirebaseAuthenticated: boolean;
  isOAuthAuthenticated: boolean;
};

const useAuth = (): AuthState => {
  const { user: auth0User, isAuthenticated: auth0IsAuthenticated, isLoading: auth0Loading } = useAuth0();
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [isGuest, setIsGuest] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setFirebaseUser(user);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const user = auth0User || firebaseUser;
  const isAuthenticated = auth0IsAuthenticated || !!firebaseUser;
 
  


  const isFirebaseAuthenticated = !!firebaseUser && firebaseUser.providerData.some((provider) => 
    provider.providerId === 'password' || 
    provider.providerId === 'google.com' ||
    provider.providerId === 'github.com' ||
    provider.providerId === 'phone'
  );
  const isOAuthAuthenticated = !!auth0User;

  return {
    user,
    isAuthenticated,
    isLoading: auth0Loading || isLoading,
    isGuest,
    setIsGuest,
    isFirebaseAuthenticated,
    isOAuthAuthenticated,
  };
};

export default useAuth;
