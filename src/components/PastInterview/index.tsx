import { lazy, Suspense, useState } from "react";
import { Spinner } from "../Spinner";
import Button from "../Button";
import { Link } from "react-router-dom";
import NoInterview from "@/assets/No Interviews.png"

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
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest"); // Sorting state
  const interviewsPerPage = 3;

  if (loading) return <Spinner />;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  const filteredInterviews = interviews.filter((interview) =>
    interview.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedInterviews = filteredInterviews.sort((a, b) => {
    const dateA = new Date(a.created_at).getTime();
    const dateB = new Date(b.created_at).getTime();
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  const indexOfLastInterview = currentPage * interviewsPerPage;
  const indexOfFirstInterview = indexOfLastInterview - interviewsPerPage;
  const currentInterviews = sortedInterviews.slice(
    indexOfFirstInterview,
    indexOfLastInterview
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const hasInterviews = interviews.length > 0;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-lvh">
      {hasInterviews ? (
        <>
          <h2 className="font-medium text-xl sm:text-2xl mb-4 text-center mt-6 sm:mt-10">
            Previous Mock Interviews
          </h2>

          <div className="mb-8 flex flex-col sm:flex-row justify-around items-center gap-4 sm:gap-0">
            <div className="relative w-full sm:w-96">
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
            <div className="relative w-full sm:w-auto">
              <select
                value={sortOrder}
                onChange={(e) => {
                  setSortOrder(e.target.value as "newest" | "oldest");
                  setCurrentPage(1);
                }}
                className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>

          {currentInterviews.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <Suspense fallback={<Spinner />}>
                {currentInterviews.map((interview) => (
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
          ) : (
            <div className="text-center mt-10 text-gray-500 text-lg">
              No interviews found for your search.
            </div>
          )}

          {filteredInterviews.length > interviewsPerPage && (
            <div className="flex justify-center mt-8 gap-2">
              <Button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </Button>
              <Button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-slate-500 text-white rounded-lg hover:bg-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentPage}
              </Button>
              <Button
                onClick={() => paginate(currentPage + 1)}
                disabled={indexOfLastInterview >= filteredInterviews.length}
                className="px-4 py-2 bg-slate-500 text-white rounded-lg hover:bg-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentPage + 1}
              </Button>
              <Button
                onClick={() => paginate(currentPage + 1)}
                disabled={indexOfLastInterview >= filteredInterviews.length}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center mt-10 sm:mt-20 mb-10 sm:mb-20 text-center text-gray-600">
          <img
            src= {NoInterview}
            alt="No Interviews"
            className="w-32 h-32 sm:w-40 sm:h-40 mb-4 sm:mb-6 opacity-80"
          />
          <h3 className="text-xl sm:text-2xl font-semibold mb-2">
            No Interviews Yet
          </h3>
          <p className="text-base sm:text-lg">
            You don't have any previous interviews.
          </p>
          <p className="text-base sm:text-lg">
            Please take an interview to get started!
          </p>
          <Link to="/">
            <Button className="mt-4 px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition">
              Take Interview Now
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default PastInterviews;
