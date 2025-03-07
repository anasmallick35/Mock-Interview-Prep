import { RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import { Toaster } from "sonner";
import useAuth from "./hooks/useAuth";
import router from "./Router";
import { Spinner } from "./components/Spinner";

const App = () => {
  useAuth();
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <RouterProvider router={router} />
        <Toaster position="bottom-left" />
      </Suspense>
    </>
  );
};

export default App;
