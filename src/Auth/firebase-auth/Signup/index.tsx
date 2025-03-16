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
import { GET_USER_BY_EMAIL, GET_USER } from "@/services/InterviewQuery";
import { CREATE_USER } from "@/services/InterviewMutation";

const FirebaseSignup: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isFirebaseLoading, setIsFirebaseLoading] = useState(false);
  const navigate = useNavigate();
  const [createUser, { loading }] = useMutation(CREATE_USER, {
    client: client,
    refetchQueries: [
      {
        query: GET_USER,
        variables: { userId: auth.currentUser?.uid }, 
        fetchPolicy: "network-only", 
      },
    ],
  });
  const [_firebaseUser, firebaseLoading, firebaseErrorState] =
    useAuthState(firebaseAuth);
  const [getUserByEmail] = useLazyQuery(GET_USER_BY_EMAIL);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    return regex.test(password);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsFirebaseLoading(true);

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

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!validatePassword(password)) {
      toast.error(
        "Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one number."
      );
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const { data } = await getUserByEmail({ variables: { email: email } });

    if (data?.users[0]?.email === email) {
      toast.error("Email already registered. Please login.");
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
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          navigate("/");
        } catch (hasuraError) {
          console.error("Hasura error:", hasuraError);
          toast.error("User creation failed.");
        }
      }
    } catch (firebaseError: any) {
      console.error(firebaseError);
      if (firebaseError.code === "auth/email-already-in-use") {
        toast.error("Email already in use. Please log in.");
      } else if (firebaseError.code === "auth/weak-password") {
        toast.error("Password must be at least 6 characters long.");
      } else {
        toast.error("Unable to register. Please try again.");
      }
    } finally {
      setIsFirebaseLoading(false);
    }
  };

  return (
    <div className="w-full">
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
            </div>
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-gray-700">Confirm Password</span>
            <div className="relative">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Confirm your password"
                required
              />
            </div>
          </label>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            aria-disabled={loading || isFirebaseLoading}
          >
            {loading || isFirebaseLoading ? "Signing up..." : "Sign up"}
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

      {(loading || isFirebaseLoading) && (
        <p className="text-center text-gray-500">Loading...</p>
      )}
    </div>
  );
};

export default FirebaseSignup;