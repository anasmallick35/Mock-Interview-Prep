import TakeInterviewContainer from "@/containers/TakeInterview";
import PastInterviews from "@/containers/PastInterview";
import UploadQuestionContainer from "@/containers/QuestionUploadForm";
import BulkUpload from "@/containers/BulkUploadQuestion";
import { Spinner } from "@/components/Spinner";

interface HomeProps {
  firebaseLoading: boolean;
  firebaseError: any
  isGuestMode: boolean;
}

const Home: React.FC<HomeProps> = ({ firebaseLoading, firebaseError, isGuestMode }) => {
  if (firebaseLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (firebaseError) {
    return <div>Error: {firebaseError.message}</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="text-center mb-6">
        <h2 className="font-extrabold text-3xl text-gray-800">Dashboard</h2>
        <h3 className="text-gray-600 text-lg mt-2">
          Create and start your AI Mock Interview
        </h3>
        {isGuestMode && <p className="text-red-500">You are in Guest Mode</p>}
      </div>

      <div className="flex flex-col md:flex-row gap-8 justify-center items-start">
        <div className="flex flex-col md:w-2/5 gap-6">
         <TakeInterviewContainer/>
          <PastInterviews/>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:w-3/5">
          <div className="shadow-xl rounded-xl border border-gray-300 bg-white p-6 w-80 h-64 flex flex-col justify-center items-center transform transition-all hover:scale-105 hover:shadow-2xl">
            <UploadQuestionContainer />
          </div>
          <div className="shadow-xl rounded-xl border border-gray-300 bg-white p-6 w-80 h-64 flex flex-col justify-center items-center transform transition-all hover:scale-105 hover:shadow-2xl">
          <BulkUpload/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
