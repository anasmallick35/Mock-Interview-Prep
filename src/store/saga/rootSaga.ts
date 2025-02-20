
import { all } from 'redux-saga/effects';
import { watchCreateInterview } from './takeInterviewSaga';
import {watchUploadQuestion} from './QuestionUploadSaga'
import { watchDeleteInterview, watchFetchInterviews } from './PrevInterviewSaga/PrevInterviewSaga';


export default function* rootSaga() {
    yield all([
      watchFetchInterviews(),
      watchDeleteInterview(),
      watchCreateInterview(),
      watchUploadQuestion(),
    ]);
  }
  