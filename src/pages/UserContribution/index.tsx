import Button from "@/components/Button";
import { UserContriProps } from "./types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faRibbon } from "@fortawesome/free-solid-svg-icons";

const UserContribution: React.FC<UserContriProps> = ({
  currentQuestions,
  scrollPagination,
  visiblePages,
  handleDeleteQuestions,
  setStatusFilter,
  setCurrentPage,
  currentPage,
  statusFilter,
  paginationRef,
  totalPages,
  totalApprovedQuestion,
  totalPendingQuestion,
  totalRejectedQuestions,
}) => {

  
  return (
    <div className="p-6 max-w-4xl mx-auto relative">
      <h2 className="text-3xl font-bold mb-16 text-center">
      <FontAwesomeIcon icon={faRibbon} className="text-green-600"/> Your Contributions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-green-50 rounded-lg shadow-sm">
          <p className="text-sm text-gray-600">Approved</p>
          <p className="text-2xl font-bold text-green-800">{totalApprovedQuestion}</p>
        </div>
        <div className="p-4 bg-yellow-50 rounded-lg shadow-sm">
          <p className="text-sm text-gray-600">Pending</p>
          <p className="text-2xl font-bold text-yellow-800">{totalPendingQuestion}</p>
        </div>
        <div className="p-4 bg-red-50 rounded-lg shadow-sm">
          <p className="text-sm text-gray-600">Rejected</p>
          <p className="text-2xl font-bold text-red-800">{totalRejectedQuestions}</p>
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="statusFilter" className="mr-2 text-gray-700">
          Filter by Status:
        </label>
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(
              e.target.value as "all" | "approved" | "rejected" | "pending"
            );
            setCurrentPage(1);
          }}
          className="p-2 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      <div className="space-y-4">
        {currentQuestions.length > 0 ? (
          currentQuestions.map((question: any) => (
            <div
              key={question.id}
              className="p-6 border rounded-lg shadow-md hover:shadow-lg transition-shadow bg-white"
            >
              <p className="text-xl font-semibold mb-2">{question.question}</p>
              <p className="text-sm text-gray-600 mb-1">
                Topic: {question.topic}
              </p>
              <div className="flex items-center mb-4">
                <span className="text-sm text-gray-600 mr-2">Status:</span>
                <span
                  className={`px-2 py-1 rounded-full text-sm font-semibold ${
                    question.status === "approved"
                      ? "bg-green-100 text-green-800"
                      : question.status === "rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {question.status}
                </span>
              </div>
              {(question.status === "pending" ||
                question.status === "rejected") && (
                <Button
                  className="bg-red-500 hover:bg-red-600 text-white transition-colors"
                  onClick={() => handleDeleteQuestions(question.id)}
                >
                  Delete
                </Button>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-lg text-gray-600">No questions found.</p>
            <p className="text-sm text-gray-500 mt-2">
              Start contributing by adding new questions!
            </p>
          </div>
        )}
      </div>

      <div
        className="flex justify-center mt-6 space-x-2 overflow-x-auto"
        ref={paginationRef}
      >
        <Button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 transition-colors"
          onClick={() => {
            setCurrentPage((prev:any) => Math.max(prev - 1, 1));
            scrollPagination("left");
          }}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <div className="flex space-x-2">
          {visiblePages.map((page: any) => (
            <Button
              key={page}
              className={`min-w-[40px] ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-800"
              } transition-colors`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}
        </div>
        <Button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 transition-colors"
          onClick={() => {
            setCurrentPage((prev: any) => Math.min(prev + 1, totalPages));
            scrollPagination("right");
          }}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default UserContribution;