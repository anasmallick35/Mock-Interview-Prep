import { call, put, takeLatest } from "redux-saga/effects";
import { GET_PENDING_QUESTIONS } from "@/services/InterviewQuery";
import {
  APPROVE_QUESTION,
  REJECT_QUESTION,
  DELETE_REJECTED_QUESTIONS,
} from "@/services/InterviewMutation";
import {
  fetchPendingQuestionsSuccess,
  fetchPendingQuestionsFailure,
  approveQuestionSuccess,
  rejectQuestionSuccess,
  deleteRejectedQuestionsSuccess,
  fetchPendingQuestionsStart,
  approveQuestionStart,
  rejectQuestionStart,
  deleteRejectedQuestionsStart,
} from "../slices/AdminSlice"; 

import { PayloadAction } from "@reduxjs/toolkit";
import client from "@/utils/apolloClient";

/*interface Question {
  id: string;
  question: string;
  topic: string;
}*/

export function* fetchPendingQuestions() {
  try {
    const { data } = yield call(client.query, {
      query: GET_PENDING_QUESTIONS,
      fetchPolicy: "network-only",
    });
    yield put(fetchPendingQuestionsSuccess(data.questions));
  } catch (error: any) {
    yield put(fetchPendingQuestionsFailure(error.message));
  }
}

export function* approveQuestion(action: PayloadAction<string>) {
  try {
    yield call(client.mutate, {
      mutation: APPROVE_QUESTION,
      variables: { id: action.payload },
      refetchQueries: [{ query: GET_PENDING_QUESTIONS }],
    });
    yield put(approveQuestionSuccess(action.payload));
  } catch (error) {
    console.error("Error approving question:", error);
  }
}

export function* rejectQuestion(action: PayloadAction<string>) {
  try {
    yield call(client.mutate, {
      mutation: REJECT_QUESTION,
      variables: { id: action.payload },
      refetchQueries: [{ query: GET_PENDING_QUESTIONS }],
    });
    yield put(rejectQuestionSuccess(action.payload));
  } catch (error) {
    console.error("Error rejecting question:", error);
  }
}

export function* deleteRejectedQuestions() {
  try {
    yield call(client.mutate, {
      mutation: DELETE_REJECTED_QUESTIONS,
    });
    yield put(deleteRejectedQuestionsSuccess());
  } catch (error) {
    console.error("Error deleting rejected questions:", error);
  }
}

// remove this

export function* watchFetchPendingQuestion() {
  yield takeLatest(fetchPendingQuestionsStart.type, fetchPendingQuestions);
}

export function* watchApproveQuestion() {
  yield takeLatest(approveQuestionStart.type, approveQuestion);
}

export function* watchRejectQuestions() {
  yield takeLatest(rejectQuestionStart.type, rejectQuestion);
}

export function* watchDeleteRejectedQuestions() {
  yield takeLatest(deleteRejectedQuestionsStart.type, deleteRejectedQuestions);
}