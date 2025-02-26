import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { deleteQuestionStart, fetchUserQuestionsStart } from "@/store/slices/UserQuestionsSlice";
import useAuth from "@/hooks/useAuth";
import { Spinner } from "@/components/Spinner";
import Button from "@/components/Button";
import { toast } from "sonner";

const UserContributions: React.FC = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { questions, loading, error } = useSelector(
    (state: RootState) => state.userQuestions
  );

  const userId = user?.sub || user?.uid;

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserQuestionsStart(userId));
    }
  }, [dispatch, userId]);

  const handleDeleteQuestions = (questionId: string) => {
    dispatch(deleteQuestionStart(questionId));
      toast.success("Question Deleted Successfully");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner/>
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
      <div className="space-y-4">
        {questions.length > 0 ? (
          questions.map((question) => (
            <div key={question.id} className="p-6 border rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <p className="text-xl font-semibold mb-2">{question.question}</p>
              <p className="text-sm text-gray-600 mb-1">Topic: {question.topic}</p>
              <p className="text-sm text-gray-600 mb-4">Status: {question.status}</p>
              <Button
                className="bg-red-500 hover:bg-red-600 text-white"
                onClick={() => handleDeleteQuestions(question.id)}
              >
                Delete
              </Button>
            </div>
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-lg text-gray-600">No questions found.</p>
            <p className="text-sm text-gray-500 mt-2">Start contributing by adding new questions!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserContributions;