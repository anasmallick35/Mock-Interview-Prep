export interface FeedbackProps {
    feedbackList: any[];
    openIndex: number | null;
    handleToggle: (index: number) => void;
    handleDelete: () => void;
    navigate: (path: string) => void;
  }
  