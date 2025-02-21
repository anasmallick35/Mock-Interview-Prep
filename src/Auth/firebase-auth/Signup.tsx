import React, { useState } from "react";
import { auth, createUserWithEmailAndPassword } from "../../utils/firebase";
import { toast } from "sonner";
import { gql, useMutation } from "@apollo/client";
import client from "../../utils/apolloClient";
import { auth as firebaseAuth } from '../../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from "react-router-dom";

export const CREATE_USER = gql`
  mutation InsertUser($id: String, $provider: String, $email: String, $name: String) {
    insert_users_one(object: { id: $id, provider: $provider, email: $email, name: $name }) {
      id
      email
      name
    }
  }
`;

const FirebaseSignup = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const [createUser, { loading, error }] = useMutation(CREATE_USER, {
    client: client,
  });
  const [_firebaseUser, firebaseLoading, firebaseErrorState] = useAuthState(firebaseAuth);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (firebaseLoading) {
      toast.info("Firebase authentication loading.");
      return;
    }
    if (firebaseErrorState) {
      toast.error(`Firebase authentication error: ${firebaseErrorState.message}`);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        try {
          await createUser({
            variables: {
              id: user.uid,
              provider: 'firebase',
              email: user.email,
              name: user.email,
            },
          });
          toast.success("Signup successful!");
          navigate('/');
        } catch (hasuraError) {
          console.error("Hasura error:", hasuraError);
          toast.error("Hasura user creation failed.");
        }
      }
    } catch (firebaseError) {
      console.error(firebaseError);
      toast.error("Unable to register");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div>
        <h2 className=" text-center text-2xl font-bold text-blue-600 dark:text-blue-400">
            CrackTogether
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSignup}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign Up
            </button>
          </div>
        </form>
        {loading && <p className="text-center text-blue-500">Loading...</p>}
        {error && <p className="text-center text-red-500">Error: {error.message}</p>}
      </div>
    </div>
  );
};

export default FirebaseSignup;