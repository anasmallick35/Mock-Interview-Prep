
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TakeInterviewState {
  loading: boolean;
  error: string | null;
  interviewId: string | null;
}

const initialState: TakeInterviewState = {
  loading: false,
  error: null,
  interviewId: null,
};

const takeInterviewSlice = createSlice({
  name: 'takeInterview',
  initialState,
  reducers: {
    createInterviewStart(state, _action: PayloadAction<{ combinedQuestions: any[]; jobTitle: string; topic: string; userId : string| undefined }>) {
      state.loading = true;
      state.error = null;
    },
    createInterviewSuccess(state, action: PayloadAction<string | null>) {
      state.interviewId = action.payload;
      state.loading = false;
      console.log('ac',action.payload)
    },
    createInterviewFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { createInterviewStart, createInterviewSuccess, createInterviewFailure } = takeInterviewSlice.actions;

export default takeInterviewSlice.reducer;