import { Link } from 'react-router-dom';
import Button from '@/components/Button';
import QuestionSection from '@/components/QuestionSection';
import RecordSection from '@/containers/RecordAnswerSection';
import { StartInterviewProps } from './types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCaretLeft, faSquareCaretRight } from '@fortawesome/free-solid-svg-icons';
import { Spinner } from '@/components/Spinner';

const StartInterviewComponent: React.FC<StartInterviewProps> = ({
  loading,
  error,
  mockInterviewQuestions,
  activeQuestionIndex,
  setActiveQuestionIndex, 
  interviewDetails,
}) => {
  if (loading) return <div><Spinner/></div>;
  if (error) return <div>Error loading interview details</div>;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Questions Section */}
        <QuestionSection
          setActiveQuestionIndex={setActiveQuestionIndex} 
        />

        {/* Video, Audio Recording */}
        <RecordSection/>
      </div>

      <div className="flex justify-end gap-6 mt-20 mr-3">
        {activeQuestionIndex > 0 && (
          <FontAwesomeIcon
            icon={faSquareCaretLeft}
            className="text-4xl cursor-pointer"
            onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)} // Pass a number
          />
        )}

        {activeQuestionIndex !== mockInterviewQuestions.length - 1 && (
          <FontAwesomeIcon
            icon={faSquareCaretRight}
            className="text-4xl cursor-pointer"
            onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)} // Pass a number
          />
        )}

        {interviewDetails && (
          <Link to={`/start-interview/${interviewDetails.id}/feedback`}>
            <Button>End Interview</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default StartInterviewComponent;