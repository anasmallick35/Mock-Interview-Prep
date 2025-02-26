import { useRouteError, useNavigate } from "react-router-dom";
import ErrorLogo from "@/assets/web-development.png";
import Button from "@/components/Button";

const ErrorPage = () => {
  const error: unknown = useRouteError();
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col gap-4 justify-center items-center h-screen">
        <img src={ErrorLogo} alt="404" className="w-40 h-40" />
        <h1 className="text-4xl font-bold">Oops!</h1>
        <p>THE PAGE YOU WERE LOOKING FOR DOESN'T EXIST</p>
        <p className="text-sm bg-red-300 rounded-sm">
          You may have mistyped the address or the page may have moved
        </p>
        <p className="text-slate-400">
          <i>
            {(error as Error)?.message ||
              (error as { statusText?: string })?.statusText}
          </i>
        </p>
        <Button onClick={() => navigate("/")}>Back to Home</Button>
      </div>
    </>
  );
};
export default ErrorPage;
