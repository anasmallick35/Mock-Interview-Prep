export interface StartInterviewProps {
    loading: boolean;
    error: any;
    mockInterviewQuestions: any[];
    activeQuestionIndex: number;
    setActiveQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
    interviewDetails: any | null;
  }