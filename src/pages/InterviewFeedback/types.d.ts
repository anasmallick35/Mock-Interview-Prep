export interface FeedbackProps {
    feedbackList: any[];
    openIndex: number | null;
    handleToggle: (index: number) => void;
    navigate: (path: string) => void;
  }
  