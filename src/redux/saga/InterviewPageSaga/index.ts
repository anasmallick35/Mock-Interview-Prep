import { call, put, takeLatest } from 'redux-saga/effects';
import { GET_INTERVIEW } from '@/services/InterviewQuery';
import {
  setLoading,
  setError,
  setQuestions,
  setInterviewDetails,
  setUserAnswer,
} from '@/redux/slices/InterviewPageSlices';
import { PayloadAction } from '@reduxjs/toolkit';
import client from "@/utils/apolloClient";
import { createInterviewSuccess } from '@/redux/slices/TakeInterviewSlice';
import { INSERT_FEEDBACK_RESP } from '@/services/InterviewMutation';


export function* fetchInterviewPageSaga(action: PayloadAction<string>) {
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

function* handleUpdateUserAnswer(action: any) {
  const { question,correctAnswer, userAnswer, feedback, rating, userEmail, mockId } = action.payload;

  try {
    yield put(setLoading(true));
    yield call(client.mutate, {
      mutation: INSERT_FEEDBACK_RESP,
      variables: {
        question,
        correctAnswer, 
        userAnswer,
        feedback,
        rating,
        userEmail,
        mockId,
      },
    });
    
      yield put(setUserAnswer({ question, userAnswer, feedback, rating,userEmail,mockId }));
      yield put(setError(null));
  } catch (error) {
    console.error(error);
    yield put(setError("Failed to load user answer"));
  } finally {
    yield put(setLoading(false));
  }
}


export function* watchFetchPageInterview() {
  yield takeLatest('interview/fetchInterview', fetchInterviewPageSaga);
}

export function* watchUserAnswer() {
  yield takeLatest('interviewPage/updateUserAnswer', handleUpdateUserAnswer);
}

