import FirebaseLogin from "@/Auth/firebase-auth/Login";
import AuthBackground from "@/components/AuthBackground";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

const AuthPage = () => {
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return navigate("/");
  }

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden mt-16">
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
                      {/* Add your logo SVG here */}
                    </svg>
                  </div>
                  <div className="mx-auto flex w-full max-w-lg flex-col px-8 pb-8 pt-4 sm:grow sm:justify-center md:h-full">
                    <div className="flex w-full flex-col flex-wrap items-start justify-center gap-2 pb-4">
                      <h1 className="text-xl font-medium">Log in</h1>
                    </div>
                    <FirebaseLogin />
                    <div className="pt-6">
                      <Link
                        className="group/create-account-cta block rounded-xl border border-border p-6 shadow-sm outline-none hover:bg-neutral-100 focus-visible:bg-neutral-100"
                        to="/sign-up"
                      >
                        <div className="flex flex-col items-start gap-0.5">
                          <div className="text-base font-medium">
                            Need an account?
                          </div>
                          <div>Sign up to start building today</div>
                        </div>
                        <div className="flex items-center justify-end">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-arrow-right opacity-50 group-hover/create-account-cta:opacity-100"
                          >
                            <path d="M5 12h14"></path>
                            <path d="m12 5 7 7-7 7"></path>
                          </svg>
                        </div>
                      </Link>
                    </div>
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

export default AuthPage;
