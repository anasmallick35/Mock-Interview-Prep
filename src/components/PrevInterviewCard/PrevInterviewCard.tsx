import React from 'react';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';


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

const PrevInterviewCard: React.FC<InterviewCardProps> = ({ interview, onDelete }) => {
  const navigate = useNavigate();

  const onStart = () => {
    navigate('/start-interview/' + interview?.id);
  };

  const onFeedbackPress = () => {
    navigate('/start-interview/' + interview?.id + '/feedback');
  };

  return (
    <div className="border border-gray-200 shadow-sm rounded-lg p-4 hover:shadow-md transition-shadow duration-300 bg-white flex flex-col h-full">
      <div className="flex-1">
        <h2 className="font-bold text-lg text-primary">{interview?.jobTitle}</h2>
        <h2 className="text-sm text-gray-600 mt-1">{interview?.topic}</h2>
        <h2 className="text-xs text-gray-400 mt-1">
          Created At: {new Date(interview?.created_at).toLocaleString()}
        </h2>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <div className="flex gap-4">
          <Button className="w-full h-10  hover:bg-blue-600 transition-colors duration-200" onClick={onFeedbackPress}>
            Feedback
          </Button>
          <Button className="w-full h-10 bg-gray-500 hover:bg-green-600 transition-colors duration-200" onClick={onStart}>
            Start
          </Button>
        </div>
        <Button
          className="w-full h-10 bg-red-500 transition-colors duration-200"
          onClick={onDelete}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default PrevInterviewCard;
