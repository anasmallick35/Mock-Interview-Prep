"use client";
import { toast } from "sonner";
import { useState, useRef } from "react";
import useAuth from "@/hooks/useAuth";
import { useParams } from "react-router-dom";
import { chatSession } from "@/utils/gemini";
import { useDispatch, useSelector } from "react-redux";
import Record from "@/components/RecordAnswerSection";
import { RootState } from "@/redux/store";
import { ElevenLabsClient } from "elevenlabs";

const client = new ElevenLabsClient({
  apiKey: import.meta.env.VITE_ELEVENLABS_API_KEY, 
});


interface QuestionSectionProps {
  setActiveQuestionIndex: (index: number) => void;
}

const useRecordContainer: React.FC<QuestionSectionProps> = ({
  setActiveQuestionIndex,
}) => {
  const { interviewId } = useParams<{ interviewId: string }>();
  const { user, isGuest } = useAuth();
  const [userRecording, setUserRecording] = useState<string>("");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [audioURL, setAudioURL] = useState<string>("");
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const dispatch = useDispatch();

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioBlobRef = useRef<Blob | null>(null);

  const { questions, activeQuestionIndex, interviewDetails } = useSelector(
    (state: RootState) => state.interviewPage
  );

  const startStopRecording = async () => {
    if (isGuest) return toast.error("Please login to continue");

    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
      setIsRecording(true);
    } else {
      setAudioURL("");
      setUserRecording("");
      audioChunksRef.current = [];
      setIsRecording(true);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        audioBlobRef.current = audioBlob;
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);
        setShowConfirmation(true);
        setIsRecording(false);

        
        try {
          const transcription = await client.speechToText.convert({
            file: audioBlob,
            model_id: "scribe_v1",
            tag_audio_events: true,
            language_code: "eng",
            diarize: true,
          });
          setUserRecording(transcription.text || "");
        } catch (err) {
          console.error("Transcription failed:", err);
          toast.error("Speech to text failed. Please try again.");
        }
      };

      mediaRecorder.start();
    }
  };

  const confirmRecording = async () => {
    setShowConfirmation(false);
    setLoading(true);

    const feedbackPrompt = `
      Question: ${questions[activeQuestionIndex]?.question}, 
      User Answer: ${userRecording}. 
      Please provide a rating (integer) and feedback (3-5 lines) in JSON format with "rating" and "feedback" fields.
    `;

    try {
      const result = await chatSession.sendMessage(feedbackPrompt);
      const responseText = result.response.text().trim();
      const cleanedJson = responseText.replace(/^```json|```$/g, "");
      const jsonFeedbackResp = JSON.parse(cleanedJson);

      dispatch({
        type: "interviewPage/updateUserAnswer",
        payload: {
          question: questions[activeQuestionIndex]?.question,
          correctAnswer: questions[activeQuestionIndex]?.answer,
          userAnswer: userRecording,
          feedback: jsonFeedbackResp.feedback,
          rating: jsonFeedbackResp.rating,
          userEmail: user?.email,
          mockId: interviewDetails.mockId || interviewId,
        },
      });

      toast("User Answer recorded successfully");
      setAudioURL("");
      setUserRecording("");
      setActiveQuestionIndex(activeQuestionIndex + 1);
    } catch (error) {
      toast.error("Failed to record answer");
    }

    setLoading(false);
  };

  const discardRecording = () => {
    setShowConfirmation(false);
    setAudioURL("");
    setUserRecording("");
  };
  console.log(isRecording);

  return (
    <Record
      isRecording={isRecording}
      loading={loading}
      startStopRecording={startStopRecording}
      audioURL={audioURL}
      showConfirmation={showConfirmation}
      confirmRecording={confirmRecording}
      discardRecording={discardRecording}
    />
  );
};

export default useRecordContainer;
