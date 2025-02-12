
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Question {
  id: string;
  question: string;
  jobTitle: string;
  topic: string;
  userId: string;
}

interface QuestionsState {
  questions: Question[];
  loading: boolean;
  error: string | null;
}

const initialState: QuestionsState = {
  questions: [],
  loading: false,
  error: null,
};

const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    fetchQuestionsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchQuestionsSuccess(state, action: PayloadAction<Question[]>) {
      state.questions = action.payload;
      state.loading = false;
    },
    fetchQuestionsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchQuestionsStart, fetchQuestionsSuccess, fetchQuestionsFailure } = questionsSlice.actions;

export default questionsSlice.reducer;