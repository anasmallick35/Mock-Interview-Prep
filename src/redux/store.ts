import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga/rootSaga';
import interviewsReducer from './slices/PastInterviewSlices';
import questionsReducer from './slices/QuestionSlice'
import takeInterviewReducer from './slices/TakeInterviewSlice'
import uploadQuestionReducer from './slices/QuestionUploadSlice'
//import storage from 'redux-persist/lib/storage';
//import { persistReducer, persistStore } from 'redux-persist';
import adminQuestionReducer from './slices/AdminSlice'
import userQuestionReducer from './slices/UserContributionSlice'
import interviewPageReducer from './slices/InterviewPageSlices'

const sagaMiddleware = createSagaMiddleware();

/*const persistConfig = {
  key:'root',
  storage,
  whitelist: ['interviews', 'questions', 'uploadQuestion','takeInterview'],
};*/


/*const persistedInterviewsReducer = persistReducer(persistConfig,interviewsReducer);
const persistedQuestionsReducer = persistReducer(persistConfig, questionsReducer);
const persistedTakeInterviewReducer = persistReducer(persistConfig, takeInterviewReducer);
const persistedUploadQuestionReducer = persistReducer(persistConfig, uploadQuestionReducer);*/



const store = configureStore({
  reducer: {
    interviews: interviewsReducer,
    questions: questionsReducer,
    takeInterview: takeInterviewReducer,
    uploadQuestion: uploadQuestionReducer,
    admin: adminQuestionReducer,
    userQuestions : userQuestionReducer,
    interviewPage: interviewPageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
//export const persistor = persistStore(store);
export default store;