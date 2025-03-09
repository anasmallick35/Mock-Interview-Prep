import { all } from "redux-saga/effects";
import { watchCreateInterview } from "./TakeInterviewSaga";
import { watchUploadQuestion } from "./QuestionUploadSaga";
import {
  watchDeleteInterview,
  watchFetchInterviews,
} from "./PrevInterviewSaga";
import {
  watchFetchPendingQuestion,
  watchApproveQuestion,
  watchDeleteRejectedQuestions,
  watchRejectQuestions,
} from "./AdminSaga";
import { watchFetchUserQuestions,watchDeleteQuestions} from "./UserContributionSaga";
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
