import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga/rootSaga';
import interviewsReducer from './slices/interviewSlices';
import questionsReducer from './slices/questionSlice';
import takeInterviewReducer from './slices/TakeInterviewSlices'
import uploadQuestionReducer from './slices/QuestionUploadSlice'

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    interviews: interviewsReducer,
    questions: questionsReducer,
    takeInterview: takeInterviewReducer,
    uploadQuestion: uploadQuestionReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;