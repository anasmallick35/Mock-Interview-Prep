interface Question {
  id: string;
  question: string;
  topic: string;
}

export interface AdminDashboardProps {
  queryLoading: boolean;
  error: any;
  data: { questions: Question[] } | null;
  approveQuestion: (id: string) => void;  
  rejectQuestion: (id: string) => void;
}