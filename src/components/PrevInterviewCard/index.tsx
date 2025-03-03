import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button";

interface Interview {
  id: string;
  jsonMockResp: string;
  jobTitle: string;
  topic: string;
  created_at: string;
}

interface InterviewCardProps {
  interview: Interview;
  onDelete: () => void;
}

const PrevInterviewCard: React.FC<InterviewCardProps> = ({
  interview,
  onDelete,
}) => {
  const navigate = useNavigate();

  const onStart = () => {
    navigate("/start-interview/" + interview?.id);
  };

  const onFeedbackPress = () => {
    navigate("/start-interview/" + interview?.id + "/feedback");
  };

  return (
    <div className="border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-white to-blue-50 overflow-hidden flex flex-col h-full">
      {/* Card Header */}
      <div className="p-6 flex-1">
        <h2 className="font-bold text-2xl text-blue-800 mb-2">
          {interview?.jobTitle}
        </h2>
        <p className="text-sm text-gray-600 mb-4">{interview?.topic}</p>
        <div className="flex items-center text-xs text-gray-500">
          <span className="mr-2">🗓️</span>
          <span>
            Created At: {new Date(interview?.created_at).toLocaleString()}
          </span>
        </div>
      </div>

      {/* Card Footer - Buttons */}
      <div className="p-4 bg-gray-50 border-t border-gray-100">
        <div className="flex gap-3 mb-3">
          <Button
            className="flex-1 h-12 bg-yellow-200 hover:bg-yellow-400 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
            onClick={onFeedbackPress}
          >
            Feedback
          </Button>
          <Button
            className="flex-1 h-12 bg-green-100 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
            onClick={onStart}
          >
            Start
          </Button>
        </div>
        <Button
          className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
          onClick={onDelete}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default PrevInterviewCard;