import { toast } from "sonner";
import React, {  useState } from "react";

import useAuth from "@/hooks/useAuth";
import QuestionUpload from "@/components/QuestionUploadForm";
import { useDispatch } from "react-redux";
import { uploadQuestionStart } from "@/redux/slices/QuestionUploadSlice";


const UploadQuestionContainer = () => {
  const { user, isGuest } = useAuth();
  const dispatch = useDispatch();


  const [question, setQuestion] = useState<string>("");
  const [jobTitle, setJobTitle] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isGuest) {
      toast.error("Please log in to continue.");
      return;
    }

    const userId = user?.uid || user?.sub || "";

    if (!userId) {
      toast.error("User ID not found. Please log in.");
      return;
    }

    dispatch(uploadQuestionStart({ question, jobTitle, topic, userId }));

    toast.success("Question submitted successfully");
    setQuestion("");
    setJobTitle("");
    setTopic("");
    setIsFormOpen(false);
  };

  const handleUploadQuestion = () => {
    if (isGuest) {
      toast.error("Please log in to start an interview.");
      return;
    }
    setIsFormOpen(true);
  };

  return (
    <QuestionUpload
      handleSubmit={handleSubmit}
      handleUploadQuestion={handleUploadQuestion}
      isFormOpen={isFormOpen}
      setIsFormOpen={setIsFormOpen}
      question={question}
      setQuestion={setQuestion}
      topic={topic}
      setTopic={setTopic}
      jobTitle={jobTitle}
      setJobTitle={setJobTitle}
    />
  );
};

export default UploadQuestionContainer;
