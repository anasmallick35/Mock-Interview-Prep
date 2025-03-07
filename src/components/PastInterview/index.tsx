import { lazy, Suspense, useState } from "react";
import { Spinner } from "../Spinner";
import Button from "../Button";

const PrevInterviewCard = lazy(() => import("../PrevInterviewCard"));

interface PastInterviewsProps {
  interviews: any[];
  loading: boolean;
  error: string | null;
  handleDeleteInterview: (id: string) => void;
}

const PastInterviews: React.FC<PastInterviewsProps> = ({
  interviews,
  loading,
  error,
  handleDeleteInterview,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const interviewsPerPage = 3;

  // Filter interviews based on search term
  const filteredInterviews = interviews.filter((interview) =>
    interview.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate the indexes for the current page
  const indexOfLastInterview = currentPage * interviewsPerPage;
  const indexOfFirstInterview = indexOfLastInterview - interviewsPerPage;
  const currentInterviews = filteredInterviews.slice(
    indexOfFirstInterview,
    indexOfLastInterview
  );

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) return <Spinner />;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4">
      {interviews?.length > 0 && (
        <h2 className="font-medium text-xl mb-4 text-center mt-10">
          Previous Mock Interviews
        </h2>
      )}

      {/* Search Box */}
      <div className="mb-8 flex justify-center">
        <div className="relative w-96">
          <input
            type="text"
            placeholder="Search by Job Title"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); 
            }}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
          >
            <path
              fillRule="evenodd"
              d="M10.5 3a7.5 7.5 0 104.95 13.38l4.09 4.09a1 1 0 001.41-1.41l-4.09-4.09A7.5 7.5 0 0010.5 3zm0 2a5.5 5.5 0 100 11 5.5 5.5 0 000-11z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {/* Interview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ml-24">
        <Suspense fallback={<Spinner />}>
          {currentInterviews?.map((interview) => (
            <div
              key={interview?.id}
              className="transform hover:translate-x-2 transition-transform duration-300"
            >
              <PrevInterviewCard
                interview={interview}
                onDelete={() => handleDeleteInterview(interview?.id)}
              />
            </div>
          ))}
        </Suspense>
      </div>

      <div className="flex justify-center mt-8">
      <Button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-300 hover:bg-gray-400 text-white transition-colors disabled:cursor-not-allowed"
        >
          Previous
        </Button>
        <Button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1  bg-slate-500 text-white rounded-lg hover:from-purple-600 hover:to-indigo-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {currentPage}
        </Button>
        <Button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastInterview >= filteredInterviews.length}
          className="px-4 py-2 mx-1  bg-slate-500 text-white rounded-lg hover:from-purple-600 hover:to-indigo-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {currentPage+1}
        </Button>
        <Button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastInterview >= filteredInterviews.length}
          className="bg-gray-300 hover:bg-gray-400 text-white transition-colors disabled:cursor-not-allowed"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default PastInterviews;