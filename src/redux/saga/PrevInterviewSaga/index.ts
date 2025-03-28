import { takeLatest, put, call } from "redux-saga/effects";
import {
  fetchInterviewsStart,
  fetchInterviewsSuccess,
  fetchInterviewsFailure,
  deleteInterviewFailure,
  deleteInterviewStart,
  deleteInterviewSuccess,
} from "../../slices/PastInterviewSlices";
import {
  fetchQuestionsStart,
  fetchQuestionsSuccess,
  fetchQuestionsFailure,
} from "../../slices/QuestionSlice";
import client from "@/utils/apolloClient";

import { PayloadAction } from "@reduxjs/toolkit";
import {
  DELETE_FEEDBACK,
  DELETE_INTERVIEW,
} from "@/services/InterviewMutation";
import {
  GET_PENDING_QUESTIONS,
  GET_USER_INTERVIEWS,
} from "@/services/InterviewQuery";
import { resetInterviewState } from "@/redux/slices/InterviewPageSlices";


export function* fetchInterviewsSaga(action: PayloadAction<string>) {
  try {
    const { data } = yield call(client.query, {
      query: GET_USER_INTERVIEWS,
      variables: { userId: action.payload },
      fetchPolicy: "network-only",
    });
    yield put(resetInterviewState());
    yield put(fetchInterviewsSuccess(data.interviews));
  } catch (error) {
    yield put(fetchInterviewsFailure("error fetching interviews"));
  }
}

export function* deleteInterviewSaga(action: any) {
  try {
    yield call(client.mutate, {
      mutation: DELETE_FEEDBACK,
      variables: { mockId: action.payload },
      refetchQueries: [{ query: GET_USER_INTERVIEWS }],
    });

    yield call(client.mutate, {
      mutation: DELETE_INTERVIEW,
      variables: { id: action.payload },
      refetchQueries: [{ query: GET_USER_INTERVIEWS }],
    });
    yield put(deleteInterviewSuccess(action.payload));
  } catch (error) {
    yield put(deleteInterviewFailure("Error deleting interview and feedback"));
  }
}

export function* fetchQuestionsSaga() {
  try {
    const { data } = yield call(client.query, {
      query: GET_PENDING_QUESTIONS,
    });

    yield put(fetchQuestionsSuccess(data.questions));
  } catch (error) {
    yield put(fetchQuestionsFailure("error"));
  }
}

export function* watchFetchInterviews() {
  yield takeLatest(fetchInterviewsStart.type, fetchInterviewsSaga);
}

export function* watchDeleteInterview() {
  yield takeLatest(deleteInterviewStart.type, deleteInterviewSaga);
}

export function* watchFetchQuestions() {
  yield takeLatest(fetchQuestionsStart.type, fetchQuestionsSaga);
}
