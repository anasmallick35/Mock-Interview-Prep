import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga/rootSaga';
import interviewsReducer from './slices/PastInterviewSlices';
import questionsReducer from './slices/QuestionSlice'
import takeInterviewReducer from './slices/TakeInterviewSlice'
import uploadQuestionReducer from './slices/QuestionUploadSlice'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import adminQuestionReducer from './slices/AdminSlice'
import userQuestionReducer from './slices/UserContributionSlice'
import interviewPageReducer from './slices/InterviewPageSlices'

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'interviewPage',
  storage,
};

const persistedInterviewPageReducer = persistReducer(persistConfig, interviewPageReducer);


const store = configureStore({
  reducer: {
    interviews: interviewsReducer,
    questions: questionsReducer,
    takeInterview: takeInterviewReducer,
    uploadQuestion: uploadQuestionReducer,
    admin: adminQuestionReducer,
    userQuestions : userQuestionReducer,
    interviewPage: persistedInterviewPageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
export default store;