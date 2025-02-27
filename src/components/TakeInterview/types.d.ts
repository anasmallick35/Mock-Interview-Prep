export interface TakeInterviewProps {
  openDialog: boolean;
  handleStartInterview: () => void;
  handleGenerateQuestions: (e: React.FormEvent) => void;
  setJobTitle: React.Dispatch<React.SetStateAction<string>>;
  setTopic: React.Dispatch<React.SetStateAction<string>>;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
}