import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadQuestionStart } from '@/store/slices/QuestionUploadSlice';
import { RootState } from '@/store/store';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { auth } from '../../utils/firebase'; 
import { useAuthState } from 'react-firebase-hooks/auth'; 

const useUploadQuestion = () => {
  const { user: auth0User, isAuthenticated: auth0IsAuthenticated } = useAuth0();
  const [firebaseUser, firebaseLoading, firebaseError] = useAuthState(auth);
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.uploadQuestion);
  const [question, setQuestion] = useState<string>('');
  const [jobTitle, setJobTitle] = useState<string>('');
  const [topic, setTopic] = useState<string>('');
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !error) {
      navigate('/');
    }
  }, [loading, error, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (firebaseLoading) {
      toast.info("Firebase authentication loading.");
      return;
    }
    if (firebaseError) {
      toast.error(`Firebase authentication error: ${firebaseError.message}`);
      return;
    }

    if (!auth0IsAuthenticated && !firebaseUser) {
      toast.error("Please log in to continue.");
      return;
    }

    const userId = firebaseUser?.uid || auth0User?.sub || ''; 

    if (!userId) {
      toast.error("User ID not found. Please log in.");
      return;
    }

    dispatch(uploadQuestionStart({ question, jobTitle, topic, userId }));

    toast.success('Questions submitted successfully');
    setQuestion('');
    setJobTitle('');
    setTopic('');
    setIsFormOpen(false);
  };

  const handleStartInterview = () => {
    if (firebaseLoading) {
      toast.info("Firebase authentication loading.");
      return;
    }
    if (firebaseError) {
      toast.error(`Firebase authentication error: ${firebaseError.message}`);
      return;
    }
    if (!auth0IsAuthenticated && !firebaseUser) {
      toast.error('Please login to start an interview.');
      return;
    }
    setIsFormOpen(true);
  };
return{
    handleSubmit,
    handleStartInterview,
    isFormOpen,
    question,
    setQuestion,
    topic,
    setTopic,
    jobTitle,
    setJobTitle,
    setIsFormOpen
}
}

export default useUploadQuestion
