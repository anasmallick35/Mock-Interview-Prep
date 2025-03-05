export interface StartInterviewProps {
    loading: boolean;
    error: any;
    mockInterviewQuestions: any[];
    activeQuestionIndex: number;
    setActiveQuestionIndex: (index: number) => void;
    interviewDetails: any | null;
  }