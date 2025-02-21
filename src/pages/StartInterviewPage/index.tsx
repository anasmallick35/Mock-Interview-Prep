import Button from '@/components/Button';
import QuestionSection from '@/components/QuestionSection';
import RecordSection from '@/containers/RecordAnswerSection';
import { Link } from 'react-router-dom';

interface StartInterviewProps {
  loading: boolean;
  error: any;
  mockInterviewQuestions: any[];
  activeQuestionIndex: number;
  setActiveQuestionIndex: React.Dispatch<React.SetStateAction<number>>
  interviewDetails: any | null;
}

const StartInterviewComponent: React.FC<StartInterviewProps> = ({
  loading,
  error,
  mockInterviewQuestions,
  activeQuestionIndex,
  setActiveQuestionIndex,
  interviewDetails,
}) => {
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading interview details</div>;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Questions Section */}
        <QuestionSection
          mockInterviewQuestions={{ questions: mockInterviewQuestions }}
          activeQuestionIndex={activeQuestionIndex}
          setActiveQuestionIndex={setActiveQuestionIndex}
        />

        {/* Video, Audio Recording */}
        <RecordSection
          mockInterviewQuestions={{ questions: mockInterviewQuestions }}
          activeQuestionIndex={activeQuestionIndex}
          interviewDetails={interviewDetails}
        />
      </div>

      <div className="flex justify-end gap-6">
        {activeQuestionIndex > 0 && (
          <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}>
            Previous Question
          </Button>
        )}
        {activeQuestionIndex !== mockInterviewQuestions?.length - 1 && (
          <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}>
            Next Question
          </Button>
        )}
        {interviewDetails && (
          <Link to={`/start-interview/${interviewDetails?.id}/feedback`}>
            <Button>End Interview</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default StartInterviewComponent;
