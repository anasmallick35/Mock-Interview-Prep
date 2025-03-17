import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import TakeInterviewComponent from "@/components/TakeInterview";
import { useDispatch, useSelector } from "react-redux";
import { createInterviewStart } from "@/redux/slices/TakeInterviewSlice";
import { RootState } from "@/redux/store";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { GET_QUESTION, GET_USER } from "@/services/InterviewQuery";
import useAuth from "@/hooks/useAuth";
import { UPDATE_POINTS } from "@/services/InterviewMutation";
import client from "@/utils/apolloClient";

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
    const response = await client.mutate({
      mutation: gql`
        mutation GetInterview($jobTitle: String!, $topic: String!) {
          get_interview(input: { jobTitle: $jobTitle, topic: $topic }) {
            questions {
              question
              answer
            }
          }
        }
      `,
      variables: {
        jobTitle: jobTitle,
        topic: topic,
      },
    });

    const geminiQuestions = response.data.get_interview.questions;


    const { data } = await getUserQuestions({
      variables: { input_text: `${jobTitle} ${topic}` }, 
    });
    

    let dbQuestion = null;
    if (data && data.search_similar_questions.length > 0) {
      dbQuestion = {
        question: data.search_similar_questions[0].question,
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
  console.log(data);
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
