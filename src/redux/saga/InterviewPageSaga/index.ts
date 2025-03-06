import { call, put, takeLatest } from 'redux-saga/effects';
import { GET_INTERVIEW } from '@/services/InterviewQuery';
import {
  setLoading,
  setError,
  setQuestions,
  setInterviewDetails,
} from '@/redux/slices/InterviewPageSlices';
import { PayloadAction } from '@reduxjs/toolkit';
import client from "@/utils/apolloClient";
import { createInterviewSuccess } from '@/redux/slices/TakeInterviewSlices';

function* fetchInterviewPageSaga(action: PayloadAction<string>) {
  try {
    yield put(setLoading(true));
    const { data } = yield call(client.query, {
      query: GET_INTERVIEW,
      variables: { interviewId: action.payload },
    });

    if (data && data.interviews.length > 0) {
      const interview = data.interviews[0];
      const jsonMock = JSON.parse(interview.jsonMockResp);
      yield put(setQuestions(jsonMock.questions));
      yield put(setInterviewDetails(interview));
    }
  } catch (error) {
    yield put(setError('Interview not fetched'));
  } finally {
    yield put(setLoading(false));
   yield put(createInterviewSuccess(null));
  }
}

export function* watchFetchInterview() {
  yield takeLatest('interview/fetchInterview', fetchInterviewPageSaga);
}