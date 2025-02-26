import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { deleteQuestionStart, fetchUserQuestionsStart } from "@/store/slices/UserQuestionsSlice";
import useAuth from "@/hooks/useAuth";
import { Spinner } from "@/components/Spinner";
import Button from "@/components/Button";
import { toast } from "sonner";

const UserContributions = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { questions, loading, error } = useSelector(
    (state: RootState) => state.userQuestions
  );

  const userId = user?.sub || user?.uid;

  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 5;

  const [statusFilter, setStatusFilter] = useState<"all" | "approved" | "rejected" | "pending">("all");

  const paginationRef = useRef<HTMLDivElement>(null); 

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserQuestionsStart(userId));
    }
  }, [dispatch, userId]);

  const handleDeleteQuestions = (questionId: string) => {
    dispatch(deleteQuestionStart(questionId));
    toast.success("Question Deleted Successfully");
  };

  const filteredQuestions = questions.filter((question) => {
    if (statusFilter === "all") return true;
    return question.status === statusFilter;
  });

  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = filteredQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);

  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);

  const getVisiblePages = () => {
    if (currentPage === 1) return [1, 2];
    if (currentPage === totalPages) return [totalPages - 1, totalPages];
    return [currentPage - 1, currentPage, currentPage + 1].filter(
      (page) => page >= 1 && page <= totalPages
    );
  };

  const visiblePages = getVisiblePages();

  
  const scrollPagination = (direction: "left" | "right") => {
    if (paginationRef.current) {
      const scrollAmount = direction === "right" ? 100 : -100;
      paginationRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <p className="text-lg font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Contributions</h2>
      <div className="mb-6">
        <label htmlFor="statusFilter" className="mr-2 text-gray-700">Filter by Status:</label>
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value as "all" | "approved" | "rejected" | "pending");
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
          currentQuestions.map((question) => (
            <div key={question.id} className="p-6 border rounded-lg shadow-md hover:shadow-lg transition-shadow bg-white">
              <p className="text-xl font-semibold mb-2">{question.question}</p>
              <p className="text-sm text-gray-600 mb-1">Topic: {question.topic}</p>
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
              {(question.status === 'pending' || question.status === 'rejected') && (
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
            <p className="text-sm text-gray-500 mt-2">Start contributing by adding new questions!</p>
          </div>
        )}
      </div>

      <div className="flex justify-center mt-6 space-x-2 overflow-x-auto" ref={paginationRef}>
        <Button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 transition-colors"
          onClick={() => {
            setCurrentPage((prev) => Math.max(prev - 1, 1));
            scrollPagination("left");
          }}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <div className="flex space-x-2">
          {visiblePages.map((page) => (
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
            setCurrentPage((prev) => Math.min(prev + 1, totalPages));
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

export default UserContributions;