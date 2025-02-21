"use client";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { GET_FEEDBACK_FROM_USER_ANSWERS } from "@/services/InterviewQuery";
import { DELETE_FEEDBACK } from "@/services/InterviewMutation";
import FeedbackComponent from "@/pages/InterviewFeedback";

const FeedbackContainer = () => {
  const { interviewId } = useParams<{ interviewId: string }>();
  const navigate = useNavigate();
  const [feedbackList, setFeedbackList] = useState<any[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const { data } = useQuery(GET_FEEDBACK_FROM_USER_ANSWERS, {
    variables: { interviewId },
  });

  useEffect(() => {
    if (data && data.userAnswer) {
      setFeedbackList(data.userAnswer);
    }
  }, [data]);

  const [deleteFeedback] = useMutation(DELETE_FEEDBACK, {
    variables: { mockId: interviewId },
    onCompleted: () => {
      alert("Feedback Deleted successfully");
      setFeedbackList([]);
    },
  });

  const handleDelete = () => deleteFeedback();
  const handleToggle = (index: number) => setOpenIndex(openIndex === index ? null : index);

  return (
    <FeedbackComponent
      feedbackList={feedbackList}
      openIndex={openIndex}
      handleToggle={handleToggle}
      handleDelete={handleDelete}
      navigate={navigate}
    />
  );
};

export default FeedbackContainer;
