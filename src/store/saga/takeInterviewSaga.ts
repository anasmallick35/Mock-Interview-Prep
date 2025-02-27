
import { takeLatest, put, call } from 'redux-saga/effects';
import { createInterviewStart, createInterviewSuccess, createInterviewFailure } from '../slices/TakeInterviewSlices';
import client from '../../utils/apolloClient'
import { v4 as uuidv4 } from 'uuid';
import { INSERT_INTERVIEW } from '@/services/InterviewMutation';


function* createInterviewSaga(action: ReturnType<typeof createInterviewStart>) {
  try {
    const { combinedQuestions, jobTitle, topic , userId  } = action.payload;

    const interviewId = uuidv4();
   yield call(client.mutate, {
      mutation: INSERT_INTERVIEW,
      variables: {
        id: interviewId,
        userId: userId,
        jsonMockResp: JSON.stringify({ questions: combinedQuestions }),
        jobTitle,
        topic,
      },
    });

    yield put(createInterviewSuccess(interviewId));
  } catch (error) {
    yield put(createInterviewFailure("error in creating interview"));
  }
}

export function* watchCreateInterview() {
  yield takeLatest(createInterviewStart.type, createInterviewSaga);
}