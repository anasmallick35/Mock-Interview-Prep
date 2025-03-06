import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./containers/ProtectedRoute";
import { lazy } from "react";

import GuestLogin from "./Auth/O-Auth/GuestLogin";
const PrevInterview = lazy(() => import("./containers/PastInterview"));
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
const ResetPassword = lazy(() => import("./Auth/firebase-auth/ResetPassword"));
const UploadPage = lazy(() => import("./pages/UploadQuestion"))
import TakeInterviewContainer from "./containers/TakeInterview";


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
          {path: "upload" , element : <UploadPage/>},

          { path: "start-interview/:interviewId", element: <StartInterview /> },
          {
            path: "start-interview/:interviewId/feedback",
            element: <Feedback />,
          },
          {path: "user-contributions" ,element: <UserContributions/>},
          {path: "prevInterview" , element : <PrevInterview/>},
          {path:"take-interview", element : <TakeInterviewContainer />}
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
      {path: "reset-password", element: <ResetPassword />}
    ],
  },
]);

export default router;
