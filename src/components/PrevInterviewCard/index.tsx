import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import ConfirmationCard from "../Cards/ConfirmationCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faCircleInfo, faTrash } from '@fortawesome/free-solid-svg-icons';


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
    <>
      <div className="w-full max-w-[20rem] shadow-lg rounded-lg bg-white p-6 hover:shadow-xl transition-shadow duration-300 overflow-hidden">
        {/* Card Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h5 className="text-xl font-semibold text-gray-800 truncate">
              {interview?.jobTitle}
            </h5>
          </div>

        
          <button
            onClick={handleDelete}
            className="p-2 bg-white rounded-full shadow-md hover:bg-red-100 transition-colors duration-200"
          >
              <FontAwesomeIcon icon={faTrash} className="h-4 w-6 text-red-500" />
          </button>
        </div>
        <div className="space-y-4">
         
          <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faCircleInfo} className="h-4 w-4 text-gray-500" />
            <p className="text-gray-600 truncate">{interview?.topic}</p>
          </div>
          
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faCalendar} className="h-4 w-4 text-gray-600" />
            <p className="text-sm text-gray-400 truncate">
              Created At: {new Date(interview?.created_at).toLocaleDateString()}
            </p>
          </div>

        
          <div className="mt-6 flex flex-col gap-3">
            <Button
              className="w-full  bg-purple-600 text-white rounded hover:bg-purple-700 transition duration-300"
              onClick={onFeedbackPress}
            >
              Feedback
            </Button>
            <Button
              className="w-full h-10 bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:from-teal-600 hover:to-cyan-600 transition-all rounded-lg"
              onClick={onStart}
            >
              Start
            </Button>
          </div>
        </div>
      </div>

     
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <ConfirmationCard
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onConfirm={handleConfirmDelete}
          />
        </div>
      )}
    </>
  );
};

export default PrevInterviewCard;