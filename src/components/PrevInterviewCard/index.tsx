import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import ConfirmationCard from "../Cards/ConfirmationCard";

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onStart = () => {
    navigate("/start-interview/" + interview?.id);
  };

  const onFeedbackPress = () => {
    navigate("/start-interview/" + interview?.id + "/feedback");
  };

  const handleDelete = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete();
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full max-w-[20rem] shadow-lg rounded-lg bg-white p-4 hover:shadow-xl transition-shadow duration-300">
      {/* Card Header */}
      <div className="flex items-center justify-between mb-4">
        {/* Job Title with Logo */}
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6 text-blue-500"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
          </svg>
          <h5 className="text-xl font-semibold text-blue-gray-900 truncate">
            {interview?.jobTitle}
          </h5>
        </div>

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          className="p-2 bg-white rounded-full shadow-md hover:bg-red-100 transition-colors duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6 text-red-500"
          >
            <path
              fillRule="evenodd"
              d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Card Body */}
      <div className="space-y-4">
        {/* Topic */}
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5 text-gray-600"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
          </svg>
          <p className="text-gray-600 truncate">{interview?.topic}</p>
        </div>

        
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5 text-gray-600"
          >
            <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM5 8V6h14v2H5z" />
          </svg>
          <p className="text-sm text-gray-400">
            Created At: {new Date(interview?.created_at).toLocaleDateString()}
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col gap-3">
          <Button
            className="w-full h-10 bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200 rounded-md"
            onClick={onFeedbackPress}
          >
            Feedback
          </Button>
          <Button
            className="w-full h-10 bg-green-500 text-white hover:bg-green-600 transition-colors duration-200 rounded-md"
            onClick={onStart}
          >
            Start
          </Button>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationCard
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default PrevInterviewCard;