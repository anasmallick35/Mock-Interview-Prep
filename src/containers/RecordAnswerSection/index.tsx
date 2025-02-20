"use client";
import { useState, useEffect } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import { toast } from "sonner";
import { chatSession } from "@/utils/gemini";
import { useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { INSERT_FEEDBACK_RESP } from "@/services/InterviewMutation";
import useAuth from "@/hooks/useAuth";

interface Question {
  question: string;
  answer: string;
}

interface InterviewDetails {
  mockId: string;
}

interface RecordContainerProps {
  mockInterviewQuestions: {
    questions: Question[];
  };
  activeQuestionIndex: number;
  interviewDetails: InterviewDetails;
}

interface ResultType {
  transcript: string;
}

export const useRecordContainer = ({
  mockInterviewQuestions,
  activeQuestionIndex,
  interviewDetails,
}: RecordContainerProps) => {
  const { interviewId } = useParams<{ interviewId: string }>();
  const { user } = useAuth();
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [insertFeedback] = useMutation(INSERT_FEEDBACK_RESP);

  const {
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    if (results.length > 0) {
      setUserAnswer(results.map((r) => (r as ResultType).transcript).join(" "));
    }
  }, [results]);

  const questions = mockInterviewQuestions?.questions || mockInterviewQuestions;

  const startStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
      updateUserAnswer();
    } else {
      startSpeechToText();
    }
  };

  const updateUserAnswer = async () => {
    setLoading(true);
    const feedbackPrompt = `
      Question: ${questions[activeQuestionIndex]?.question}, 
      User Answer: ${userAnswer} depends on question and answer. 
      Please provide a rating (integer) and feedback (3-5 lines) in JSON format with "rating" and "feedback" fields.
    `;

    try {
      const result = await chatSession.sendMessage(feedbackPrompt);
      const responseText = result.response.text().trim();
      const cleanedJson = responseText.replace(/^```json|```$/g, "");
      const jsonFeedbackResp = JSON.parse(cleanedJson);

      const resp = await insertFeedback({
        variables: {
          question: questions[activeQuestionIndex]?.question,
          correctAnswer: questions[activeQuestionIndex]?.answer,
          userAnswer,
          feedback: jsonFeedbackResp.feedback,
          rating: jsonFeedbackResp.rating,
          userEmail: user?.email || "crackTogether@gmail.com",
          mockId: interviewDetails.mockId || interviewId, 
        },
      });

      if (resp) {
        toast("User Answer recorded successfully");
        setUserAnswer("");
        setResults([]);
      }
    } catch (error) {
      console.error("Error updating answer:", error);
      toast.error("Failed to record answer");
    }
    
    setLoading(false);
  };

  return {
    isRecording,
    loading,
    startStopRecording,
  };
};
