import { Link } from "react-router-dom";
import Button from "@/components/Button";
import QuestionSection from "@/components/QuestionSection";
import RecordSection from "@/containers/RecordAnswerSection";
import { StartInterviewProps } from "./types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faSquareCaretLeft, faSquareCaretRight } from "@fortawesome/free-solid-svg-icons";


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

      <div className="flex justify-end gap-6 mt-20 mr-3">
        {activeQuestionIndex > 0 && (
          <FontAwesomeIcon icon={faSquareCaretLeft} className = "text-4xl" onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}/>
        )}

        {activeQuestionIndex !== mockInterviewQuestions?.length - 1 && (
          <FontAwesomeIcon icon={faSquareCaretRight} className = "text-4xl" onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}/>
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
