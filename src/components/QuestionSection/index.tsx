import { FaLightbulb, FaVolumeUp } from "react-icons/fa";
import React from 'react'

interface Question {
    question : string;
}

interface QuestionSectionProps {
    mockInterviewQuestions : { questions: Question[] },

    activeQuestionIndex : number,
    setActiveQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
}

const textToSpeech = (text : string) : void =>{
    if('speechSynthesis' in window){
        const speech = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(speech);
    } else {
        alert('Sorry your browser does not support text to speech');
    }
}

const QuestionSection: React.FC<QuestionSectionProps> = ({
    mockInterviewQuestions,
    activeQuestionIndex,
    setActiveQuestionIndex
  })=>{

    const questions = mockInterviewQuestions?.questions || []; 

    return (
        <div className="mt-2 p-5 border rounded-lg">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {questions.length > 0 ? (
              questions.map((_question, index) => (
                <h2
                  key={index}
                  className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer ${activeQuestionIndex === index ? 'bg-primary text-white' : ''}`}
                  onClick={() => {
                    setActiveQuestionIndex(index);
                  }}
                >
                  Question #{index + 1}
                </h2>
              ))
            ) : (
              <p>No questions available.</p> 
            )}
          </div>
    
          <h2 className="my-5 text-md md:text-lg">
            {questions && questions[activeQuestionIndex]?.question}
          </h2>
    
          <FaVolumeUp
            className="cursor-pointer"
            onClick={() => textToSpeech(questions[activeQuestionIndex]?.question || '')}
          /> 
    
          <div className="border rounded-lg p-5 bg-blue-300 mt-20">
            <h2 className="flex gap-2 items-center text-blue-700">
            <FaLightbulb />
              <strong>Note:</strong>
            </h2>
            <h2 className="text-sm my-2 text-blue-700">
            Click on Record Answer when you want to answer the question. At the end of interview we will give you the feedback along with correct answer for each of question and your answer to comapre it.
            </h2>
          </div>
        </div>
      );
}

export default QuestionSection;
