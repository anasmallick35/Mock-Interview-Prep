import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createInterviewStart } from "../../store/slices/TakeInterviewSlices";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import { LoaderCircle } from "lucide-react";
import { useLazyQuery } from "@apollo/client";
import { chatSession } from "@/utils/gemini";
import { useAuth0 } from "@auth0/auth0-react";
import { GET_QUESTION } from "@/services/InterviewQuery";
import { toast } from "sonner";
import { auth } from '../../utils/firebase'; 
import { useAuthState } from 'react-firebase-hooks/auth'; 

const TakeInterview = () => {
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

  return (
    <>
      {!openDialog ? (
        <div
          className="p-6 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
          onClick={handleStartInterview}
        >
          <h2 className="font-bold text-lg text-center">+ Take new Interview</h2>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg ">
          <h1 className="text-2xl font-bold text-center mb-2">Tell us about the job role</h1>
          <p className="text-center text-gray-600 mb-6">
            Add details about your job position, job role, description, and years of experience.
          </p>

          <form onSubmit={handleGenerateQuestions} className="space-y-4">
            <div>
              <label className="block font-medium text-gray-700 mb-1">Job Title</label>
              <input
                type="text"
                placeholder="Enter Job Title"
                onChange={(e) => setJobTitle(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">Job Responsibilities</label>
              <textarea
                placeholder="E.g. React, Angular, Java"
                required
                onChange={(e) => setTopic(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 h-28 resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                onClick={() => setOpenDialog(false)}
                className="px-4 py-2 border rounded-lg bg-gray-200 hover:bg-gray-300 transition"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center space-x-2"
              >
                {loading ? (
                  <>
                    <LoaderCircle className="animate-spin w-5 h-5" />
                    <span>Generating...</span>
                  </>
                ) : (
                  "Start Interview"
                )}
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default TakeInterview;