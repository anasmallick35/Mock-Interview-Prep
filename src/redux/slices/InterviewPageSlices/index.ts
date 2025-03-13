import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface UserAnswer {
  question: string;
  userAnswer: string;
  feedback: string;
  rating: number;
  userEmail: string;
  mockId: string;
}
interface InterviewPageState {
  loading: boolean;
  error: string | null;
  questions: any[];
  activeQuestionIndex: number;
  interviewDetails: any | null;
  userAnswers: UserAnswer[];
}

const initialState: InterviewPageState = {
  loading: false,
  error: null,
  questions: [],
  activeQuestionIndex: 0,
  interviewDetails: null,
  userAnswers: []
};

const interviewPageSlice = createSlice({
  name: 'interviewPage',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setQuestions(state, action: PayloadAction<any[]>) {
      state.questions = action.payload;
    },
    setActiveQuestionIndex(state, action: PayloadAction<number>) {
      state.activeQuestionIndex = action.payload;
    },
    setInterviewDetails(state, action: PayloadAction<any>) {
      state.interviewDetails = action.payload;
    },
    setUserAnswer(state, action: PayloadAction<UserAnswer>) {
      const { question, userAnswer, feedback, rating, userEmail , mockId } = action.payload;
      const existingAnswerIndex = state.userAnswers.findIndex(
        (answer) => answer.question === question
      );
      if (existingAnswerIndex >= 0) {
        state.userAnswers[existingAnswerIndex] = { question, userAnswer, feedback, rating,userEmail,mockId };
      } else {
        state.userAnswers.push({ question, userAnswer, feedback, rating, userEmail, mockId});
      }
    },
    clearUserAnswer(state, action: PayloadAction<string>) {
      state.userAnswers = state.userAnswers.filter(
        (answer) => answer.question !== action.payload
      );
    },
    resetInterviewState(state) {
      state.loading = false;
      state.error = null;
      state.questions = [];
      state.activeQuestionIndex = 0;
      state.interviewDetails = null;
      state.userAnswers = [];
    },
  }
});

export const {
  setLoading,
  setError,
  setQuestions,
  setActiveQuestionIndex,
  setInterviewDetails,
  setUserAnswer,
  clearUserAnswer,
  resetInterviewState
} = interviewPageSlice.actions;

export default interviewPageSlice.reducer;