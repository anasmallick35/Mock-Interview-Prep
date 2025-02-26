import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface Question{
  question : string;
  jobTitle : string;
  topic : string
}

interface QuestionUploadState {
  loading: boolean;
  error: string | null;
  questions : Question[]
}

const initialState: QuestionUploadState = {
  loading: false,
  error: null,
  questions : []
};

const questionUploadSlice = createSlice({
  name: 'questionUpload',
  initialState,
  reducers: {
    uploadQuestionStart(state, _action: PayloadAction<{ question : string, jobTitle : string, topic : string, userId : string}>) {
      state.loading = true;
      state.error = null;
    },
    uploadQuestionSuccess(state, action: PayloadAction<Question[]>) {
      state.questions = action.payload;
      state.loading = false;
    },
    uploadQuestionFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { uploadQuestionStart, uploadQuestionSuccess, uploadQuestionFailure } = questionUploadSlice.actions;

export default questionUploadSlice.reducer;



