'use client'
import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_INTERVIEW } from '@/services/InterviewQuery';
import StartInterviewComponent from '@/pages/StartInterviewPage';

const StartInterviewContainer = () => {
  const { interviewId } = useParams<{ interviewId: string }>();

  const { data, loading, error } = useQuery(GET_INTERVIEW, {
    variables: { interviewId },
  });

  const [mockInterviewQuestions, setMockInterviewQuestions] = useState<any[]>([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
  const [interviewDetails, setInterviewDetails] = useState<any | null>(null);

  useEffect(() => {
    if (data && data.interviews.length > 0) {
      const interview = data.interviews[0];
      const jsonMock = JSON.parse(interview.jsonMockResp);
      setMockInterviewQuestions(jsonMock.questions);
      setInterviewDetails(interview);
    }
  }, [data]);

  return (
    <StartInterviewComponent
      loading={loading}
      error={error}
      mockInterviewQuestions={mockInterviewQuestions}
      activeQuestionIndex={activeQuestionIndex}
      setActiveQuestionIndex={setActiveQuestionIndex}
      interviewDetails={interviewDetails}
    />
  );
};

export default StartInterviewContainer;
