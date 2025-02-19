import { useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PENDING_QUESTIONS } from "@/services/InterviewQuery";
import { APPROVE_QUESTION, DELETE_REJECTED_QUESTIONS, REJECT_QUESTION } from "@/services/InterviewMutation";

const AdminDashboard = () => {
  const { loading: queryLoading, error, data, refetch } = useQuery(GET_PENDING_QUESTIONS, {
    fetchPolicy: "network-only",
  });

  const [approveQuestion, { loading: approveLoading }] = useMutation(APPROVE_QUESTION, {
    onCompleted: () => refetch(),
  });

  const [rejectQuestion, { loading: rejectLoading }] = useMutation(REJECT_QUESTION, {
    onCompleted: () => refetch(),
  });

  const [deleteOldRejectedQuestions] = useMutation(DELETE_REJECTED_QUESTIONS);

  useEffect(() => {
    deleteOldRejectedQuestions();
  }, []);

  if (queryLoading) return <div>Loading...</div>;
  if (error) {
    console.error("GraphQL Error:", error);
    return <div>Error fetching questions: {error.message}</div>;
  }
  if (!data || !data.questions) return <div>No pending questions found.</div>;

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div className="space-y-4">
        {data.questions.map((question: any) => (
          <div key={question.id} className="p-4 border rounded">
            <p>{question.question}</p>
            <p>Topic: {question.topic}</p>
            <button
              disabled={approveLoading} 
              onClick={() => approveQuestion({ variables: { id: question.id } })}
              className="bg-green-500 text-white p-2 rounded mr-2 disabled:bg-green-300"
            >
              {approveLoading ? "Approving..." : "Approve"}
            </button>
            <button
              disabled={rejectLoading} 
              onClick={() => rejectQuestion({ variables: { id: question.id } })}
              className="bg-red-500 text-white p-2 rounded disabled:bg-red-300"
            >
              {rejectLoading ? "Rejecting..." : "Reject"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;