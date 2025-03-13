import { Link } from 'react-router-dom';
import QuestionSection from '@/components/QuestionSection';
import RecordSection from '@/containers/RecordAnswerSection';
import { StartInterviewProps } from './types';
import { Spinner } from '@/components/Spinner';




const StartInterviewComponent: React.FC<StartInterviewProps> = ({
  loading,
  error,
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
        <RecordSection
        setActiveQuestionIndex={setActiveQuestionIndex}
        />
      </div>

      <div className="flex justify-end gap-6 mt-20 mr-3">

        {interviewDetails && (
          <Link to={`/start-interview/${interviewDetails.id}/feedback`}>
            <button className='w-full mt-6 bg-purple-600 text-white rounded hover:bg-purple-700 transition duration-300'>End Interview</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default StartInterviewComponent;
