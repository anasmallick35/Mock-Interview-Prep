import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  deleteQuestionStart,
  fetchUserQuestionsStart,
} from "@/store/slices/UserQuestionsSlice";
import useAuth from "@/hooks/useAuth";
import { toast } from "sonner";
import UserContribution from "@/pages/UserContribution";
import { Spinner } from "@/components/Spinner";

const UserContributions = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { questions, loading, error } = useSelector(
    (state: RootState) => state.userQuestions
  );

  const userId = user?.sub || user?.uid;

  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 5;

  const [statusFilter, setStatusFilter] = useState<
    "all" | "approved" | "rejected" | "pending"
  >("all");

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
  const currentQuestions = filteredQuestions.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );

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
      paginationRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const totalQuestions = questions.length;

  const totalPendingQuestion = questions.filter(
    (question) => question.status === "pending"
  ).length;

  const totalApprovedQuestion = questions.filter(
    (question) => question.status === "approved"
  ).length;
  const totalRejectedQuestions =
    totalQuestions - totalPendingQuestion - totalApprovedQuestion;

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
    <UserContribution
      currentQuestions={currentQuestions}
      scrollPagination={scrollPagination}
      visiblePages={visiblePages}
      handleDeleteQuestions={handleDeleteQuestions}
      setStatusFilter={setStatusFilter}
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}
      statusFilter={statusFilter}
      paginationRef={paginationRef}
      totalPages={totalPages}
      totalQuestions={totalQuestions}
      totalPendingQuestion={totalPendingQuestion}
      totalApprovedQuestion={totalApprovedQuestion}
      totalRejectedQuestions={totalRejectedQuestions}
    />
  );
};

export default UserContributions;