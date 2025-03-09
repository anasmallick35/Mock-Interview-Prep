import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Question {
  id: string;
  question: string;
  topic: string;
}

interface AdminState {
  pendingQuestions: Question[];
  approvedQuestions: Question[];
  rejectedQuestions: Question[];
  loading: boolean;
  error: string | null;
}

const initialState: AdminState = {
  pendingQuestions: [],
  approvedQuestions: [],
  rejectedQuestions: [],
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    fetchPendingQuestionsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchPendingQuestionsSuccess(state, action: PayloadAction<Question[]>) {
      state.pendingQuestions = action.payload;
      state.loading = false;
    },
    
    fetchPendingQuestionsFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    approveQuestionStart(state, _action: PayloadAction<string>) {
      state.loading = true;
      state.error = null;
    },
    approveQuestionSuccess(state, action: PayloadAction<string>) {
      state.pendingQuestions = state.pendingQuestions.filter(
        (question) => question.id !== action.payload,
      );
      state.loading = false
    },
    rejectQuestionStart(state, _action: PayloadAction<string>) {
      state.loading = true;
      state.error = null;
    },
    rejectQuestionSuccess(state, action: PayloadAction<string>) {
      state.pendingQuestions = state.pendingQuestions.filter(
        (question) => question.id !== action.payload
      );
      state.loading = false
    },
    deleteRejectedQuestionsStart() {
    },
    deleteRejectedQuestionsSuccess(state) {
      state.rejectedQuestions = [];
    },
  },
});

export const {
  fetchPendingQuestionsStart,
  fetchPendingQuestionsSuccess,
  fetchPendingQuestionsFailure,
  approveQuestionStart,
  approveQuestionSuccess,
  rejectQuestionStart,
  rejectQuestionSuccess,
  deleteRejectedQuestionsStart,
  deleteRejectedQuestionsSuccess,
} = adminSlice.actions;

export default adminSlice.reducer;