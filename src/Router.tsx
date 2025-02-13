import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { lazy } from "react";
import Layout from "./components/Layout";

const Home = lazy(() => import("./pages/Home"));
const Profile = lazy(() => import("./pages/Profile"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const StartInterview = lazy(() => import("./pages/StartInterviewPage"));
const Feedback = lazy(() => import("./pages/InterviewFeedback"));
const Login = lazy(() => import("./auth/Login"));
const Logout = lazy(() => import("./auth/Logout"));
const GuestLogin = lazy(() => import("./auth/guestLogin"));

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
      { path: "login", element: <Login /> }, 
      { path: "logout", element: <Logout /> }, 
      { path: "guest-login", element: <GuestLogin /> }, 
    ],
  },
]);

export default router;