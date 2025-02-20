import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createInterviewStart } from "../../store/slices/TakeInterviewSlices";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { chatSession } from "@/utils/gemini";
import { useAuth0 } from "@auth0/auth0-react";
import { GET_QUESTION } from "@/services/InterviewQuery";
import { toast } from "sonner";
import { auth } from '../../utils/firebase'; 
import { useAuthState } from 'react-firebase-hooks/auth'; 

const useTakeInterview = () => {
  const [jobTitle, setJobTitle] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { interviewId } = useSelector((state: RootState) => state.takeInterview);
  const [getUserQuestions] = useLazyQuery(GET_QUESTION);
  const { user: auth0User, isAuthenticated: auth0IsAuthenticated } = useAuth0();
  const [firebaseUser] = useAuthState(auth);

  useEffect(() => {
    if (interviewId) {
      navigate(`/start-interview/${interviewId}`);
    }
  }, [interviewId, navigate]);

  const handleGenerateQuestions = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!auth0IsAuthenticated && !firebaseUser) {
      toast.error("Please log in to continue.");
      return;
    }

    try {
      const prompt = `Job position: ${jobTitle}, job responsibility: ${topic}. Depend on this information, give me 5 questions with answers in JSON format. Remember give only question and answer and not unnecessary text`;
      const result = await chatSession.sendMessage(prompt);
      const responseText = result.response.text().trim();
      const cleanedJson = responseText.replace(/^```json|```$/g, '');
      const geminiQuestions = JSON.parse(cleanedJson);

      const { data } = await getUserQuestions({
        variables: { jobTitle: `%${jobTitle}%`, topic: `%${topic}%` },
      });

      let dbQuestion = null;
      if (data && data.questions.length > 0) {
        dbQuestion = {
          question: data.questions[0].question,
          answer: "",
        };
      }

      const combinedQuestions = dbQuestion ? [...geminiQuestions, dbQuestion] : geminiQuestions;
      const userId = firebaseUser?.uid || auth0User?.sub;

      if (userId) {
        dispatch(createInterviewStart({ combinedQuestions, jobTitle, topic, userId }));
        toast.success("Interview created successfully");
      }
    } catch (error) {
      console.error("Error generating questions:", error);
      toast.error("Error in generating questions");
    } finally {
      setLoading(false);
    }
  };

  const handleStartInterview = () => {
    if (!auth0IsAuthenticated && !firebaseUser) {
      toast.error('Please login to start an interview.');
      return;
    }
    setOpenDialog(true);
  };
  return{
    jobTitle, 
    setJobTitle,
    handleStartInterview,
    handleGenerateQuestions,
    openDialog,
    loading,
    setTopic,
    topic,
    setOpenDialog
  }

}

export default useTakeInterview