import React, { useState } from "react";
import {
  auth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from "@/utils/firebase";

import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_USER } from "@/services/InterviewQuery";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa"; 
import { CREATE_USER } from "@/services/InterviewMutation";


const FirebaseLogin = () => {

  const [createUser] = useMutation(CREATE_USER);
  const [getUser] = useLazyQuery(GET_USER); 

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if(!email || !password) {
        toast.error("Email and password are required");
      }

      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
      toast.success("Login successfull")
    } catch (error) {
      console.error(error);
      toast.error("User not found. Please register.");
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await getUser({ variables: { userId: user?.uid } });

      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Unable to Login");
    }
  };

  const handleGithubLogin = async () => {
    const provider = new GithubAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const {data} = await getUser({ variables: { userId: user?.uid } });

      if (!data.users_by_pk) {
        await createUser({
          variables: {
            id: user.uid,
            provider: "github",
            email: user.email,
            name: user.displayName || user.email,
          },
        });
      }

      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Unable to Login");
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        <button
          className="flex items-center justify-center gap-2 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          onClick={handleGoogleLogin}
        >
          <FcGoogle className="w-5 h-5" /> 
          <span className="text-sm font-medium text-gray-700">Sign in with Google</span>
        </button>

        <button
          className="flex items-center justify-center gap-2 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          onClick={handleGithubLogin}
        >
          <FaGithub className="w-5 h-5" /> 
          <span className="text-sm font-medium text-gray-700">Sign in with GitHub</span>
        </button>
      </div>

      <div className="my-6 flex items-center">
        <hr className="flex-grow border-t border-gray-300" />
        <span className="mx-4 text-sm text-gray-500">or continue with email</span>
        <hr className="flex-grow border-t border-gray-300" />
      </div>

      <form id="log-in-form" className="w-full" onSubmit={handleLogin}>
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
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Password</span>
              <Link to="/reset-password" className="text-sm text-blue-500 hover:underline">Forgot password?</Link>
            </div>
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
          </label>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Log in
          </button>
        </div>
      </form>
    </div>
  );
};

export default FirebaseLogin;