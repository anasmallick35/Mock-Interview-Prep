
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./containers/ProtectedRoute";
import { lazy } from "react";
import Layout from "./components/Layout";
import GuestLogin from "./Auth/O-Auth/GuestLogin";

const Home = lazy(() => import("./containers/Home"));
const Profile = lazy(() => import("./pages/Profile"));
const AdminDashboard = lazy(() => import("./containers/AdminDashboard"));
const StartInterview = lazy(() => import("./pages/StartInterviewPage"));
const Feedback = lazy(() => import("./pages/InterviewFeedback"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const FirebaseLogin = lazy(() => import('./Auth/firebase-auth/Login'));
const FirebaseSignup = lazy(() => import('./Auth/firebase-auth/Signup'));

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <ProtectedRoute />,
        children: [
          { index: true, element: <Home /> },
          { path: "profile", element: <Profile /> },
          { path: "start-interview/:interviewId", element: <StartInterview /> },
          { path: "start-interview/:interviewId/feedback", element: <Feedback /> },
        ],
      },
      {
        path: "/admin",
        element: <ProtectedRoute adminOnly={"admin"} />,
        children: [{ path: "", element: <AdminDashboard /> }],
      },
      { path: "auth", element: <AuthPage /> },
      { path: "firebase-login", element: <FirebaseLogin /> },
      { path: "firebase-signup", element: <FirebaseSignup /> },
      {path: "guest-login", element: <GuestLogin />},
      
    ],
  },
]);

export default router;