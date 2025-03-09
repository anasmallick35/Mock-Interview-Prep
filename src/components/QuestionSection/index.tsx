import { FaLightbulb } from "react-icons/fa";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface QuestionSectionProps {
  setActiveQuestionIndex: (index: number) => void;
}

const textToSpeech = (text: string): void => {
  if ("speechSynthesis" in window) {
    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
  } else {
    alert("Sorry, your browser does not support text to speech.");
  }
};

const QuestionSection: React.FC<QuestionSectionProps> = ({
  setActiveQuestionIndex,
}) => {
  const { questions, activeQuestionIndex } = useSelector(
    (state: RootState) => state.interviewPage
  );

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
                index !== activeQuestionIndex && index !== activeQuestionIndex + 1
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer"
              }`}
              onClick={() => setActiveQuestionIndex(index)}
              disabled={
                index !== activeQuestionIndex && index !== activeQuestionIndex + 1
              } // Disable all buttons except active and next
              title={
                index < activeQuestionIndex
                  ? "You cannot reattempt previous questions"
                  : ""
              } // Tooltip for previous questions
            >
              Question #{index + 1}
            </button>
          ))
        ) : (
          <p>No questions available.</p>
        )}
      </div>

      <div className="flex flex-row gap-8">
        <h2 className="my-5 text-md md:text-lg">
          {questions && questions[activeQuestionIndex]?.question}
        </h2>
        <FontAwesomeIcon
          icon={faVolumeHigh}
          className="my-6 text-md md:text-lg cursor-pointer"
          onClick={() =>
            textToSpeech(questions[activeQuestionIndex]?.question || "")
          }
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