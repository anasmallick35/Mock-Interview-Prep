import { all } from "redux-saga/effects";
import { watchCreateInterview } from "./takeInterviewSaga";
import { watchUploadQuestion } from "./QuestionUploadSaga";
import {
  watchDeleteInterview,
  watchFetchInterviews,
} from "./PrevInterviewSaga/PrevInterviewSaga";
import {
  watchFetchPendingQuestion,
  watchApproveQuestion,
  watchDeleteRejectedQuestions,
  watchRejectQuestions,
} from "./AdminSaga";
import { watchFetchUserQuestions,watchDeleteQuestions} from "./UserQuestionsSaga";
import { watchFetchInterview } from "./InterviewPageSaga";

export default function* rootSaga() {
  yield all([
    watchFetchInterviews(),
    watchDeleteInterview(),
    watchCreateInterview(),
    watchUploadQuestion(),
    watchFetchPendingQuestion(),
    watchApproveQuestion(),
    watchDeleteRejectedQuestions(),
    watchRejectQuestions(),
    watchFetchUserQuestions(),
    watchDeleteQuestions(),
    watchFetchInterview(),
  ]);
}
