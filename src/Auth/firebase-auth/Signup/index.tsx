import React, { useState } from "react";
import {
  auth,
  createUserWithEmailAndPassword,

} from "@/utils/firebase";
import { toast } from "sonner";
import { useLazyQuery, useMutation } from "@apollo/client";
import client from "@/utils/apolloClient";
import { auth as firebaseAuth } from "@/utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { GET_USER_BY_EMAIL } from "@/services/InterviewQuery";
import { CREATE_USER } from "@/services/InterviewMutation";

const FirebaseSignup = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const [createUser, { loading }] = useMutation(CREATE_USER, {
    client: client,
  });
  const [_firebaseUser, firebaseLoading, firebaseErrorState] =
    useAuthState(firebaseAuth);
  const [getUserByEmail] = useLazyQuery(GET_USER_BY_EMAIL);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (firebaseLoading) {
      toast.info("Firebase authentication loading.");
      return;
    }
    if (firebaseErrorState) {
      toast.error(
        `Firebase authentication error: ${firebaseErrorState.message}`
      );
      return;
    }
    const { data } = await getUserByEmail({ variables: { email: email } });

    if (data?.users[0]?.email === email) {
      toast.error("Email already registered. Please login.");
      return;
    }

    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (user) {
        try {
          await createUser({
            variables: {
              id: user.uid,
              provider: "firebase",
              email: user.email,
              name: user.email,
            },
          });
          toast.success("Signup successful!");
          navigate("/");
        } catch (hasuraError) {
          console.error("Hasura error:", hasuraError);
          toast.error("User creation failed.");
        }
      }
    } catch (firebaseError) {
      console.error(firebaseError);
      toast.error('Unable to register');
    }
  };


  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">

        <button
          className="flex items-center justify-center gap-2 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          data-dd-action-name="Sign up with Github"
        >
          <FaGithub className="w-5 h-5" />
          <span className="text-sm font-medium text-gray-700">
            Sign up with GitHub
          </span>
        </button>
      </div>

      <div className="my-6 flex items-center">
        <hr className="flex-grow border-t border-gray-300" />
        <span className="mx-4 text-sm text-gray-500">
          or create account with email
        </span>
        <hr className="flex-grow border-t border-gray-300" />
      </div>

      <form id="sign-up-form" className="w-full" onSubmit={handleSignup}>
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-gray-700">Email</span>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
              required
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-gray-700">Password</span>
            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="absolute right-2 top-2 p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Show password"
              >
              </button>
            </div>
          </label>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            aria-disabled={loading}
          >
            {loading ? "Signing up..." : "Sign up"}
          </button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/log-in" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>

      {loading && <p className="text-center text-gray-500">Loading...</p>}
    </div>
  );
};

export default FirebaseSignup;