import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";

 interface Question{
    id: string;
    question : string;
    topic : string
    status : string
  }

interface UserQuestionsState {
  questions: Question[];
  loading: boolean;
  error: string | null;
}

const initialState: UserQuestionsState = {
  questions: [],
  loading: false,
  error: null,
};

const userQuestionsSlice = createSlice({
  name: "userQuestions",
  initialState,
  reducers: {
    fetchUserQuestionsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchUserQuestionsSuccess(state, action: PayloadAction<Question[]>) {
      state.questions = action.payload;
      state.loading = false;
    },
    fetchUserQuestionsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      toast.error("Not getting Questions")
    },

    deleteQuestionStart(state, _action: PayloadAction<string>) {
        state.loading = true;
        state.error = null;
      },
  
      deleteQuestionSuccess(state, action: PayloadAction<string>) {
        state.questions = state.questions.filter(
          (question) => question.id !== action.payload
        );
        state.loading = false;
      },
  
      deleteQuestionFailure(state, action: PayloadAction<string>) {
        state.loading = false;
        state.error = action.payload;
        toast.error("Error in deleting questions. Please try again later")
      },
  },
});

export const {
  fetchUserQuestionsStart,
  fetchUserQuestionsSuccess,
  fetchUserQuestionsFailure,
  deleteQuestionFailure,
  deleteQuestionStart,
  deleteQuestionSuccess
} = userQuestionsSlice.actions;

export default userQuestionsSlice.reducer;