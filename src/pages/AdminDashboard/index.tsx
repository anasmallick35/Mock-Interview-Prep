import React from "react";
import Button from "@/components/Button"; 
import { AdminDashboardProps } from "./types";
import { Spinner } from "@/components/Spinner";


const AdminDashboard: React.FC<AdminDashboardProps> = ({
  queryLoading,
  error,
  data,
  approveQuestion,
  rejectQuestion,
}) => {
  if (queryLoading) return <div><Spinner/></div>;
  if (error) {
    console.error("GraphQL Error:", error);
    return <div>Error fetching questions: {error.message}</div>;
  }
  if (!data || !data.questions || data.questions.length === 0) {
    return <div>No pending questions found.</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="space-y-4">
        {data.questions.map((question) => (
          <div key={question.id} className="p-4 border rounded">
            <p className="font-semibold">{question.question}</p>
            <p className="text-gray-600">Topic: {question.topic}</p>

            <Button
              onClick={() =>
                approveQuestion(question?.id)  
              }
              className="bg-green-500 text-white p-2 rounded mr-2 disabled:bg-green-300"
            >
              Approve
            </Button>
            <Button
              onClick={() => rejectQuestion(question?.id)}
              className="bg-red-500 text-white p-2 rounded disabled:bg-red-300"
            >
              Reject
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;