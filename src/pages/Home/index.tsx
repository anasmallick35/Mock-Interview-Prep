import { Spinner } from "@/components/Spinner";
import TakeInterviewContainer from "@/containers/TakeInterview";
import ContributionCard from "@/components/Cards/ContributionCard";
import PrevInterviewCard from "@/components/Cards/PrevInterviewCard";

interface HomeProps {
  firebaseLoading: boolean;
  firebaseError: any;
  // isGuestMode: boolean;
}

const Home: React.FC<HomeProps> = ({ firebaseLoading, firebaseError }) => {
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
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <div className="text-center mb-4 sm:mb-6">
        <h2 className="font-extrabold text-2xl sm:text-3xl text-gray-800">
          Dashboard
        </h2>
        <h3 className="text-gray-600 text-base sm:text-lg mt-2">
          Create and start your AI Mock Interview
        </h3>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 sm:gap-8 justify-between items-start mt-10">
        <div className="flex flex-col w-full md:w-2/5 gap-4 sm:gap-6">
         <TakeInterviewContainer />
          <PrevInterviewCard/>
        </div>
        <div className="flex flex-col gap-4 sm:gap-6 w-full md:w-2/5">
          <ContributionCard />
        </div>
      </div>
    </div>
  );
};

export default Home;
