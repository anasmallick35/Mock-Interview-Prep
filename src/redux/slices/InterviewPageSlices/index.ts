import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InterviewPageState {
  loading: boolean;
  error: string | null;
  questions: any[];
  activeQuestionIndex: number | null;
  interviewDetails: any | null;
}

const initialState: InterviewPageState = {
  loading: false,
  error: null,
  questions: [],
  activeQuestionIndex: 0,
  interviewDetails: null,
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
  },
});

export const {
  setLoading,
  setError,
  setQuestions,
  setActiveQuestionIndex,
  setInterviewDetails,
} = interviewPageSlice.actions;

export default interviewPageSlice.reducer;