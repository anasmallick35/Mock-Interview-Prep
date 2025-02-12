'use client'
import React, { useState, useEffect } from 'react'
import Button from './Button';
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic, StopCircle } from 'lucide-react'
import { toast } from 'sonner'
import { useAuth0 } from '@auth0/auth0-react';
import { chatSession } from '@/utils/gemini';
import { useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import webCam from '@/assets/webcam.png';
import { INSERT_FEEDBACK_RESP } from '@/services/InterviewMutation';




interface Question {
    question : string;
    answer : string;
    
}

interface RecordAnswerSectionProps {
    mockInterviewQuestions: {
        questions: Question[];
    };
    
    activeQuestionIndex: number;
    interviewDetails: { mockId: string };
  }

  interface ResultType {
    transcript: string;
  }


const RecordAnswerSection : React.FC<RecordAnswerSectionProps> = ({
    mockInterviewQuestions,
    activeQuestionIndex,
    
})=>{

    const { interviewId } = useParams<{ interviewId: string }>();

        const {user} = useAuth0();
        const [userAnswer , setUserAnswer] = useState<string>('');
        const [loading , setLoading] = useState<boolean>(false)

        const [insertFeedback ] = useMutation(INSERT_FEEDBACK_RESP);


        const {
            isRecording,
            results,
            startSpeechToText,
            stopSpeechToText,
            setResults,
          } = useSpeechToText({
            continuous: true,
            useLegacyResults: false
          });

          useEffect(() => {
            if (results.length > 0) {
              setUserAnswer(results.map((r) => (r as ResultType).transcript).join(' '));
            }
          }, [results]);
        

          const startStopRecording = async ()=>{
            if(isRecording){
                stopSpeechToText()
                updateUserAnswer()

            }
            else{
                startSpeechToText();
            }
          }

          const questions = mockInterviewQuestions?.questions || mockInterviewQuestions;
          const updateUserAnswer = async () =>{
            setLoading(true);
            const feedbackPrompt = "Question: "+questions[activeQuestionIndex]?.question+", User Answer: "+userAnswer+ "depends on question and answer of given interview question "+ "Please give us rating in integer for answer and feedback as area of improvement if any" + "in just 3 to 5 lines to improve it in json format with rating field and feedback field";

            const result = await chatSession.sendMessage(feedbackPrompt);

            //const MockJsonResponse = (result.response.text()).replace('```json','').replace('```','');
            const responseText = result.response.text().trim(); 
            const cleanedJson = responseText.replace(/^```json|```$/g, ''); 
            console.log(cleanedJson)
            const jsonFeedbackResp = JSON.parse(cleanedJson);

            const resp = await insertFeedback({
               variables : {
                    question : questions[activeQuestionIndex]?.question,

                    correctAnswer : questions[activeQuestionIndex]?.answer,

                    userAnswer : userAnswer,
                    feedback : jsonFeedbackResp.feedback,

                    rating : jsonFeedbackResp.rating,

                    userEmail : user?.email,
                    mockId : interviewId
               }
              });

              if (resp) {
                toast('User Answer recorded successfully');
                setUserAnswer('')
                setResults([])
              }  
              setResults([])
            setLoading(false);
              
          }
          
          return(
            <div className='flex items-center justify-center flex-col'>
            <div className='flex flex-col my-20 justify-center bg-black items-center rounded-lg p-5'>
                <img src = {webCam} 
                width = {200} height = {200} alt = "webcam"
                className='absolute'/>
                <Webcam 
                mirrored = {true}
                style = {{
                    height : 300,
                    width : '100%',
                    zIndex : 10
                }}/>
            </div>
            <Button disabled = {loading} className = 'my-1 bg-red-500' onClick = {startStopRecording}
            >
                {isRecording ? 
            <h2 className=' flex gap-2'><StopCircle/>Stop Recording</h2>
            :
            <h2 className='flex gap-2 items-center'><Mic/>Record Answer</h2>
                 }</Button>
            </div>
          )
          



}

export default RecordAnswerSection;
