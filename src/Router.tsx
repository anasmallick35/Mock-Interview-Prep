import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./containers/ProtectedRoute";
import { lazy } from "react";

import GuestLogin from "./Auth/O-Auth/GuestLogin";
import TakeInterview from "./containers/TakeInterview";
import PastInterviews from "./containers/PastInterview"
const Home = lazy(() => import("./containers/Home"));
const Profile = lazy(() => import("./containers/Profile"));
const AdminDashboard = lazy(() => import("./containers/AdminDashboard"));
const StartInterview = lazy(() => import("./containers/StartInterview"));
const Feedback = lazy(() => import("./containers/Feedback"));
//const AuthPage = lazy(() => import("./pages/AuthPage"));
const FirebaseLogin = lazy(() => import("./pages/Auth/Login"));
const FirebaseSignup = lazy(() => import("./pages/Auth/Signup"));
const Error = lazy(() => import("./pages/Error"));
const UserContributions = lazy(()=> import("./containers/UserContribution"))


const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <ProtectedRoute />,
        children: [
          { index: true, element: <Home /> },
          { path: "profile", element: <Profile /> },
          {path: "take-interview", element: <TakeInterview/>},
          { path: "start-interview/:interviewId", element: <StartInterview /> },
          {
            path: "start-interview/:interviewId/feedback",
            element: <Feedback />,
          },
          {path: "past-interviews" ,element: <PastInterviews/>},
          {path: "user-contributions" ,element: <UserContributions/>}
        ],
      },
      {
        path: "/admin",
        element: <ProtectedRoute adminOnly={"admin"} />,
        children: [{ path: "", element: <AdminDashboard /> }],
      },
      
      { path: "log-in", element: <FirebaseLogin /> },
      { path: "sign-up", element: < FirebaseSignup/> },
      { path: "guest-login", element: <GuestLogin /> },
    ],
  },
]);

export default router;
