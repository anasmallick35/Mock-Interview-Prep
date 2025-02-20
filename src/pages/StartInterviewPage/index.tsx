'use client'

import { useEffect, useState } from 'react';
import Button from '@/components/Button';
import QuestionSection from '@/components/QuestionSection';
import RecordAnswerSection from '@/components/RecordAnswerSection';
import { useQuery } from '@apollo/client';

import { Link, useParams } from 'react-router-dom';  
import { GET_INTERVIEW } from '@/services/InterviewQuery';

const StartInterview = () => {
  const { interviewId } = useParams<{ interviewId: string }>(); 

  const { data, loading, error } = useQuery(GET_INTERVIEW, {
    variables: { interviewId },
  });


  const [mockInterviewQuestion, setMockInterviewQuestion] = useState<any[]>([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
  const [interviewDetails, setInterviewDetails] = useState<any | null>(null);

  useEffect(() => {
    if (data && data.interviews.length > 0) {
      const interview = data.interviews[0];
      const jsonMock = JSON.parse(interview.jsonMockResp);
      setMockInterviewQuestion(jsonMock.questions);
      setInterviewDetails(interview);
    }
  }, [data]);
  
  console.log(interviewDetails)
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading interview details</div>;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Questions */}
        <QuestionSection
          mockInterviewQuestions={ { questions: mockInterviewQuestion }}
          activeQuestionIndex={activeQuestionIndex}
          setActiveQuestionIndex={setActiveQuestionIndex}
        />

        {/* Video, audio recording */}
        <RecordAnswerSection
          mockInterviewQuestions={{ questions: mockInterviewQuestion }}
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
        {activeQuestionIndex !== mockInterviewQuestion?.length - 1 && (
          <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}>
            Next Question
          </Button>
        )}
        {interviewDetails && (
          <Link to={'/start-interview/'+interviewDetails?.id+"/feedback"} >
            <Button>End Interview</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default StartInterview;
