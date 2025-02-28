import React, { useState } from "react";
import {
  auth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "../../utils/firebase";

import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { RecaptchaVerifier } from "firebase/auth";
import {  useMutation, useQuery } from "@apollo/client";
import { CREATE_USER } from "./Signup";
import { GET_USER } from "@/services/InterviewQuery";

const FirebaseLogin = () => {
  const [createUser] = useMutation(CREATE_USER)

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [confirmation, setConfirmation] = useState<ConfirmationResult | null>(
    null
  );
  const [showOtpInput, setShowOtpInput] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Unable to Login");
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const { data } = useQuery(GET_USER,{
        variables: { userId: user.uid },
      })

      if (!data.users_by_pk) {
        await createUser({
          variables: {
            id: user.uid,
            provider: "google",
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

  const handleGithubLogin = async () => {
    const provider = new GithubAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const { data } = useQuery(GET_USER,{
        variables: { userId: user.uid },
      })

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

  const handlePhoneNumberLogin = async () => {
    try {
      const recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
        }
      );
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        recaptchaVerifier
      );
      setConfirmation(confirmationResult);
      setShowOtpInput(true);
    } catch (error) {
      console.error(error);
      toast.error("Unable to login");
    }
  };

  const handleOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (confirmation) {
        await confirmation.confirm(otp);

        if (auth.currentUser) {
          const user = auth.currentUser;
          const { data } = useQuery(GET_USER,{
            variables: { userId: user.uid },
          })

          if (!data?.users_by_pk) {
            try {
              await createUser({
                variables: {
                  id: user.uid,
                  provider: "phone",
                  email: user.email || "crackTogether@gmail.com",
                  name: user.displayName || "crackTogether",
                },
              });
              toast.success("Login successful!");
              navigate("/");
            } catch (hasuraError) {
              console.error("Hasura error:", hasuraError);
              toast.error("Database user creation failed.");
            }
          } else {
            toast.success("Login successful!");
            navigate("/");
          }
        }
      } else {
        toast.error("Confirmation not available");
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to login");
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
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Login
            </button>
          </div>
        </form>
        <div className="mt-6">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Login with Google
          </button>
          <button
            onClick={handleGithubLogin}
            className="w-full mt-4 flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Login with GitHub
          </button>
        </div>
        <div className="mt-6">
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
          />
          <button
            onClick={handlePhoneNumberLogin}
            className="w-full mt-4 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Send OTP
          </button>
        </div>
        {showOtpInput && (
          <form className="mt-6 space-y-6" onSubmit={handleOtp}>
            <div>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Verify OTP
              </button>
            </div>
          </form>
        )}
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
};

export default FirebaseLogin;