'use client';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import StartInterviewComponent from '@/pages/StartInterviewPage';
import {
  setActiveQuestionIndex,
} from '@/redux/slices/InterviewPageSlices';
import { RootState } from '@/redux/store'; 
import { Spinner } from '@/components/Spinner';

const StartInterviewContainer = () => {
  const { interviewId } = useParams<{ interviewId: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const {
    loading,
    error,
    questions: mockInterviewQuestions,
    activeQuestionIndex,
    interviewDetails,
  } = useSelector((state: RootState) => state.interviewPage);


  useEffect(() => {
    if (interviewId) {
      dispatch({ type: 'interview/fetchInterview', payload: interviewId });
    }

    
  }, [interviewId, dispatch]);

  
  const handleSetActiveQuestionIndex = (index: number) => {
    dispatch(setActiveQuestionIndex(index));
  };

  useEffect(() => {
    if (
      !loading &&
      interviewDetails?.id && 
      activeQuestionIndex === mockInterviewQuestions.length && 
      mockInterviewQuestions.length > 0
    ) {
      <Spinner/>
      const timeout = setTimeout(() => {
        navigate(`/start-interview/${interviewDetails.id}/feedback`);
      }, 1000);

      return () => clearTimeout(timeout); 
    }
  }, [activeQuestionIndex, mockInterviewQuestions.length, interviewDetails, loading, navigate]);


  return (
    <StartInterviewComponent
      loading={loading}
      error={error}
      mockInterviewQuestions={mockInterviewQuestions}
      activeQuestionIndex={activeQuestionIndex}
      setActiveQuestionIndex={handleSetActiveQuestionIndex}
      interviewDetails={interviewDetails}
    />
  );
};

export default StartInterviewContainer;