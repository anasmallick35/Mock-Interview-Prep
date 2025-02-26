import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Interview {
  id: string;
  userId: string;
  jsonMockResp: string;
  jobTitle: string;
  topic: string;
  created_at: string;
  interviewId: string;
}

interface InterviewsState {
  interviews: Interview[];
  loading: boolean;
  error: string | null;
}

const initialState: InterviewsState = {
  interviews: [],
  loading: false,
  error: null,
};

const interviewsSlice = createSlice({
  name: "interviews",
  initialState,
  reducers: {
    fetchInterviewsStart(state, _action: PayloadAction<string>) {
      state.loading = true;
      state.error = null;
    },
    fetchInterviewsSuccess(state, action: PayloadAction<Interview[]>) {
      state.interviews = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchInterviewsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteInterviewStart(state, _action: PayloadAction<string>) {
      state.loading = true;
      state.error = null;
    },
    deleteInterviewSuccess(state, action: PayloadAction<string>) {
      state.interviews = state.interviews.filter(
        (interview) => interview.id !== action.payload
      );
      state.loading = false;
    },
    deleteInterviewFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchInterviewsStart,
  fetchInterviewsSuccess,
  fetchInterviewsFailure,
  deleteInterviewFailure,
  deleteInterviewStart,
  deleteInterviewSuccess,
} = interviewsSlice.actions;

export default interviewsSlice.reducer;
