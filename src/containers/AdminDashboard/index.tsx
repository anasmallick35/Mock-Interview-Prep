import { useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import AdminDashboard from "@/pages/AdminDashboard"; 
import { GET_PENDING_QUESTIONS } from "@/services/InterviewQuery";
import { APPROVE_QUESTION, DELETE_REJECTED_QUESTIONS, REJECT_QUESTION } from "@/services/InterviewMutation";


const AdminDashboardContainer = () => {
  const { loading: queryLoading ,error, data, refetch } = useQuery(GET_PENDING_QUESTIONS, {
    fetchPolicy: "network-only",
  });

  const [approveQuestion] = useMutation(APPROVE_QUESTION, {
    onCompleted: () => refetch(),
  });

  const [rejectQuestion] = useMutation(REJECT_QUESTION, {
    onCompleted: () => refetch(),
  });

  const [deleteOldRejectedQuestions] = useMutation(DELETE_REJECTED_QUESTIONS);

  useEffect(() => {
    deleteOldRejectedQuestions();
  }, [deleteOldRejectedQuestions]);

  return (
    <AdminDashboard
    queryLoading = {queryLoading}
      error={error}
      data={data ?? null} 
      approveQuestion={approveQuestion}
      rejectQuestion={rejectQuestion}
    />
  );
};

export default AdminDashboardContainer;
