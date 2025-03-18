import { ChevronsUpDown } from "lucide-react";
import Button from "@/components/Button";
import { FeedbackProps } from "./types";

const FeedbackComponent: React.FC<FeedbackProps> = ({
  feedbackList,
  openIndex,
  handleToggle,
  navigate,
}) => {
  return (
    <div className="p-10 ml-6">
      {feedbackList.length === 0 ? (
        <h2 className="font-bold text-lg text-green-500">
          No interview Feedback
        </h2>
      ) : (
        <>
        <h2 className="text-3xl font-bold text-green-600 mt-4">
        Congratulations!
      </h2>
      <h2 className="font-bold text-2xl">Here is your interview feedback</h2>
          <p className="text-sm text-gray-500">
            Below are interview questions with correct answers, your answers,
            and feedback for improvement.
          </p>

          {feedbackList.map((item, index) => (
            <div key={index} className="mt-4 border rounded-lg overflow-hidden">
              <button
                onClick={() => handleToggle(index)}
                className="w-full p-3 flex justify-between items-centertext-black hover:bg-gray-200 transition"
              >
                {item.question}
                <ChevronsUpDown className="h-4" />
              </button>

              {openIndex === index && (
                <div className="p-4 space-y-2 bg-white border-t">
                  <p className="text-red-500 p-2 border rounded-lg">
                    <strong>Rating:</strong> {item.rating}
                  </p>
                  <p className="p-2 border rounded-lg bg-red-50 text-sm text-red-900">
                    <strong>Your Answer:</strong> {item.userAnswer}
                  </p>
                  {item.correctAnswer.length > 0 && (
                    <p className="p-2 border rounded-lg bg-green-50 text-sm text-green-900">
                    <strong>Correct Answer:</strong> {item.correctAnswer}
                  </p>
                  )
                     
                  }
                 
                  <p className="p-2 border rounded-lg bg-blue-50 text-sm text-blue-900">
                    <strong>Feedback:</strong> {item.feedback}
                  </p>
                </div>
              )}
            </div>
          ))}
        </>
      )}

      <Button
        className="mt-5 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        onClick={() => navigate("/")}
      >
        Go Home
      </Button>
    </div>
  );
};

export default FeedbackComponent;
