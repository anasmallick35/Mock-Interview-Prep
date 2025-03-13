import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { chatSession } from "@/utils/gemini";
import TakeInterviewComponent from "@/components/TakeInterview";
import { useDispatch, useSelector } from "react-redux";
import { createInterviewStart } from "@/redux/slices/TakeInterviewSlice";
import { RootState } from "@/redux/store";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { GET_QUESTION, GET_USER } from "@/services/InterviewQuery";
import useAuth from "@/hooks/useAuth";
import { UPDATE_POINTS } from "@/services/InterviewMutation";

const useTakeInterview = () => {
  const [jobTitle, setJobTitle] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { interviewId } = useSelector(
    (state: RootState) => state.takeInterview
  );
  const [getUserQuestions] = useLazyQuery(GET_QUESTION);
  const { user, isFirebaseAuthenticated, isOAuthAuthenticated } = useAuth();

  const [updateUserPoints] = useMutation(UPDATE_POINTS);

  useEffect(() => {
    if (interviewId) {
      navigate(`/start-interview/${interviewId}`);
    }
  }, [interviewId, navigate]);


  const handleGenerateQuestions = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!isFirebaseAuthenticated && !isOAuthAuthenticated) {
      toast.error("Please log in to continue.");
      return;
    }

    try {
      const prompt = `Job position: ${jobTitle}, job responsibility: ${topic}. Depend on this information, give me 5 questions with answers in JSON format. Remember give only question and answer and not unnecessary text`;
      const result = await chatSession.sendMessage(prompt);
      const responseText = result.response.text().trim();
      const cleanedJson = responseText.replace(/^```json|```$/g, "");
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

      const combinedQuestions = dbQuestion
        ? [...geminiQuestions, dbQuestion]
        : geminiQuestions;
      const userId = user?.uid || user?.sub;

      if (userId) {
        dispatch(
          createInterviewStart({ combinedQuestions, jobTitle, topic, userId })
        );

        await updateUserPoints({
          variables: {
            id: userId,
            points: -50, 
          },
        });
        toast.success("Interview created successfully. 50 points deducted.");
      }
    } catch (error) {
      console.error("Error generating questions:", error);
      toast.error("Error in generating questions");
    } finally {
      setLoading(false);
    }
  };

  const { data } = useQuery(GET_USER, {
    variables: {
      userId: isFirebaseAuthenticated ? user?.uid : user?.sub,
    },
  });
  console.log(data)
  const handleStartInterview = () => {
    if (!isFirebaseAuthenticated && !isOAuthAuthenticated) {
      toast.error("Please login to start an interview.");
      return;
    }
   if (data?.users_by_pk?.points < 50) {
      toast.error("You don't have enough points to start an interview.");
      return;
    }
    setOpenDialog(true);
  };

  return (
    <TakeInterviewComponent
      openDialog={openDialog}
      handleStartInterview={handleStartInterview}
      handleGenerateQuestions={handleGenerateQuestions}
      setJobTitle={setJobTitle}
      setTopic={setTopic}
      setOpenDialog={setOpenDialog}
      loading={loading}
    />
  );
};

export default useTakeInterview;
