
import { all } from 'redux-saga/effects';
import { watchCreateInterview } from './takeInterviewSaga';
import {watchUploadQuestion} from './QuestionUploadSaga'
import { watchDeleteInterview, watchFetchInterviews, watchFetchQuestions } from './PrevInterviewSaga';

export default function* rootSaga() {
    yield all([
      watchFetchInterviews(),
      watchFetchQuestions(),
      watchDeleteInterview(),
      watchCreateInterview(),
      watchUploadQuestion()
    ]);
  }
  