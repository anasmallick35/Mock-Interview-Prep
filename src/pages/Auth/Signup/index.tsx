import AuthBackground from "@/components/AuthBackground";
import FirebaseSignup from "@/Auth/firebase-auth/Signup";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";

const SignupPage = () => {
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();
  

  useEffect(() => {
    if (isAuthenticated) {
       navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden mt-20">
      <div className="relative isolate grow">
        <div
          className="absolute inset-0 flex h-full flex-col overflow-hidden bg-background"
          data-theme="light"
        >
          <div className="flex size-full grow-0 flex-col overflow-auto lg:block">
            <div className="max-w-7xl p-4 lg:mx-auto lg:flex lg:min-h-full lg:max-w-[1500px] lg:flex-row-reverse lg:p-0">
              <AuthBackground />
              <div className="lg:flex lg:w-full lg:max-w-2xl lg:shrink-0 lg:grow-0 lg:flex-col lg:items-center lg:justify-center lg:py-8">
                <div className="w-full">
                  <div className="mx-auto max-w-lg px-8">
                    <svg
                      width="106"
                      height="25"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 106 25"
                      className="h-6 w-auto"
                    >
                      {/* logo SVG */}
                    </svg>
                  </div>
                  <div className="mx-auto flex w-full max-w-lg flex-col px-8 pb-8 pt-4 sm:grow sm:justify-center md:h-full">
                    <div className="flex w-full flex-col flex-wrap items-start justify-center gap-2 pb-4">
                      <h1 className="text-xl font-medium">Signup</h1>
                    </div>
                    <FirebaseSignup />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
