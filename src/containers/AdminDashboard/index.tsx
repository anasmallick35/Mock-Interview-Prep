import { useEffect } from "react";
import AdminDashboard from "@/pages/AdminDashboard";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPendingQuestionsStart,
  approveQuestionStart,
  rejectQuestionStart,
  deleteRejectedQuestionsStart,
} from "@/redux/slices/AdminSlice";
import { RootState } from "@/redux/store";

const AdminDashboardContainer = () => {
  const dispatch = useDispatch();

  const { pendingQuestions, loading, error } = useSelector(
    (state: RootState) => state.admin
  );

  useEffect(() => {
    if(pendingQuestions)
    dispatch(fetchPendingQuestionsStart());
  }, [dispatch]);

  useEffect(() => {
    dispatch(deleteRejectedQuestionsStart());
  }, [dispatch]);

  const handleApproveQuestion = (questionId: string) => {
    if(questionId)
    dispatch(approveQuestionStart(questionId));
  };
  const handleRejectQuestion = (questionId: string) => {
    if(questionId)
    dispatch(rejectQuestionStart(questionId));
  };
 

  return (
    <AdminDashboard
      queryLoading={loading}
      error={error}
      data={{ questions: pendingQuestions }} 
      approveQuestion={handleApproveQuestion}
      rejectQuestion={handleRejectQuestion} 
    />
  );
};

export default AdminDashboardContainer;