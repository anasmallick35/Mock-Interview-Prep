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

const Error = lazy(() => import("./pages/Error"));
const UserContributions = lazy(()=> import("./containers/UserContribution"))
const ResetPassword = lazy(() => import("./Auth/firebase-auth/ResetPassword"));
const UploadPage = lazy(() => import("./pages/UploadQuestion"))
import TakeInterviewContainer from "./containers/TakeInterview";
import RoleBasedRouter from "./containers/RoleBasedRouter";
import LoginPage from "./pages/Auth/Login";
import SignupPage from "./pages/Auth/Signup";


const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <RoleBasedRouter />,
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
      { path: "log-in", element: <LoginPage/> },
      { path: "sign-up", element: < SignupPage/> },
      { path: "guest-login", element: <GuestLogin /> },
      {path: "reset-password", element: <ResetPassword />}
    ],
  },
]);

export default router;
