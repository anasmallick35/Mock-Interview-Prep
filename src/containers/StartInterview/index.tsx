'use client';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import StartInterviewComponent from '@/pages/StartInterviewPage';
import {
  setActiveQuestionIndex,
} from '@/redux/slices/InterviewPageSlices';
import { RootState } from '@/redux/store'; // Adjust the import path as needed

const StartInterviewContainer = () => {
  const { interviewId } = useParams<{ interviewId: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access Redux state
  const {
    loading,
    error,
    questions: mockInterviewQuestions,
    activeQuestionIndex,
    interviewDetails,
  } = useSelector((state: RootState) => state.interviewPage);

  // Dispatch action to fetch interview data
  useEffect(() => {
    if (interviewId) {
      dispatch({ type: 'interview/fetchInterview', payload: interviewId });
    }

    
  }, [interviewId, dispatch]);

  // Function to handle setting the active question index
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