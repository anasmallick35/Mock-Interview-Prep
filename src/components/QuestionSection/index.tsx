"use client";
import { FaLightbulb } from "react-icons/fa";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface QuestionSectionProps {
  setActiveQuestionIndex: (index: number) => void;
}

const QuestionSection: React.FC<QuestionSectionProps> = ({
  setActiveQuestionIndex,
}) => {
  const { questions, activeQuestionIndex } = useSelector(
    (state: RootState) => state.interviewPage
  );

  const [isPlaying, setIsPlaying] = useState(false);
  const [audioInstance, setAudioInstance] = useState<HTMLAudioElement | null>(null);

  const textToSpeech = async (text: string) => {
    try {
      const response = await fetch("https://api.elevenlabs.io/v1/text-to-speech/JBFqnCBsd6RMkjVDRZzb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": import.meta.env.ELEVENLABS_API_KEY || "",
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch TTS audio");
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      setAudioInstance(audio);
      setIsPlaying(true);

      audio.play();

      audio.onended = () => {
        setIsPlaying(false);
        setAudioInstance(null);
      };

    } catch (err) {
      console.error("Text-to-Speech Error:", err);
      alert("Failed to play text-to-speech audio.");
    }
  };

  const handleAudioToggle = () => {
    const text = questions[activeQuestionIndex]?.question || "";
    if (isPlaying && audioInstance) {
      audioInstance.pause();
      audioInstance.currentTime = 0;
      setIsPlaying(false);
      setAudioInstance(null);
    } else {
      textToSpeech(text);
    }
  };

  return (
    <div className="mt-2 p-5 border rounded-lg">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {questions.length > 0 ? (
          questions.map((_question, index) => (
            <button
              key={index}
              className={`p-2 rounded-full text-xs md:text-sm text-center ${
                activeQuestionIndex === index
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-700"
              } ${
                index !== activeQuestionIndex
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer"
              }`}
              onClick={() => setActiveQuestionIndex(index)}
              disabled={index !== activeQuestionIndex}
              title={
                index < activeQuestionIndex
                  ? "You cannot reattempt previous questions"
                  : ""
              }
            >
              Question #{index + 1}
            </button>
          ))
        ) : (
          <p>No questions available.</p>
        )}
      </div>

      <div className="flex flex-row gap-4 items-center">
        <h2 className="my-5 text-md md:text-lg">
          {questions[activeQuestionIndex]?.question}
        </h2>
        <FontAwesomeIcon
          icon={isPlaying ? faVolumeXmark : faVolumeHigh}
          className="my-6 text-lg cursor-pointer transition duration-200 hover:text-blue-600"
          onClick={handleAudioToggle}
          title={isPlaying ? "Stop Audio" : "Play Audio"}
        />
      </div>

      <div className="border rounded-lg p-5 bg-blue-300 mt-20">
        <h2 className="flex gap-2 items-center text-blue-700">
          <FaLightbulb />
          <strong>Note:</strong>
        </h2>
        <h2 className="text-sm my-2 text-blue-700">
          Click on "Record Answer" when you want to answer the question. At the
          end of the interview, we will give you feedback along with the correct
          answer for each question and your answer to compare it.
        </h2>
      </div>
    </div>
  );
};

export default QuestionSection;
