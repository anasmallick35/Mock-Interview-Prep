import React, { useState } from "react";
import Button from "@/components/Button";
import { AdminDashboardProps } from "./types";
import { Spinner } from "@/components/Spinner";

const QUESTIONS_PER_PAGE = 5;

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  queryLoading,
  error,
  data,
  approveQuestion,
  rejectQuestion,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  if (queryLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner />
      </div>
    );

  if (error) {
    console.error("GraphQL Error:", error);
    return (
      <div className="text-red-600 text-center font-medium">
        Error fetching questions: {error.message}
      </div>
    );
  }

  if (!data || !data.questions || data.questions.length === 0) {
    return (
      <div className="text-center text-gray-500 text-lg">
        No pending questions found.
      </div>
    );
  }

  const filteredQuestions = data.questions.filter((question) =>
    question.topic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredQuestions.length / QUESTIONS_PER_PAGE);
  const indexOfLast = currentPage * QUESTIONS_PER_PAGE;
  const indexOfFirst = indexOfLast - QUESTIONS_PER_PAGE;
  const currentQuestions = filteredQuestions.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getVisiblePages = () => {
    if (totalPages <= 3) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage === 1) return [1, 2, 3];
    if (currentPage === totalPages) return [totalPages - 2, totalPages - 1, totalPages];
    return [currentPage - 1, currentPage, currentPage + 1];
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Admin Dashboard
      </h1>

      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search by topic..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full max-w-md px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="space-y-6">
        {currentQuestions.length === 0 ? (
          <div className="text-center text-gray-400">No matching questions.</div>
        ) : (
          currentQuestions.map((question) => (
            <div
              key={question.id}
              className="p-6 bg-white shadow-md border border-gray-200 rounded-lg transition-all duration-200 hover:shadow-lg"
            >
              <p className="font-semibold text-lg text-gray-800 mb-2">
                {question.question}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Topic: <span className="font-medium">{question.topic}</span>
              </p>
              <div className="flex gap-4">
                <Button
                  onClick={() => approveQuestion(question.id)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors duration-150 disabled:bg-green-300"
                >
                  Approve
                </Button>
                <Button
                  onClick={() => rejectQuestion(question.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors duration-150 disabled:bg-red-300"
                >
                  Reject
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {filteredQuestions.length > QUESTIONS_PER_PAGE && (
        <div className="flex justify-center items-center mt-8 gap-2">
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
          >
            Prev
          </Button>

          {visiblePages.map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 text-sm rounded ${
                page === currentPage
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {page}
            </button>
          ))}

          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
