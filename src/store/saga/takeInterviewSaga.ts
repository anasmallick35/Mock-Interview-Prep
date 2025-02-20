
import { takeLatest, put, call } from 'redux-saga/effects';
import { createInterviewStart, createInterviewSuccess, createInterviewFailure } from '../slices/TakeInterviewSlices';
import { gql } from '@apollo/client';
import client from '../../utils/apolloClient'
import { v4 as uuidv4 } from 'uuid';


function* createInterviewSaga(action: ReturnType<typeof createInterviewStart>) {
  try {
    const { combinedQuestions, jobTitle, topic , userId  } = action.payload;

    const interviewId = uuidv4();
    const INSERT_INTERVIEW = gql`
      mutation InsertInterview(
        $id: uuid!,
        $userId: String!,
        $jsonMockResp: String!,
        $jobTitle: String!,
        $topic: String!
      ) {
        insert_interviews_one(
          object: {
            id: $id,
            user_id: $userId,
            jsonMockResp: $jsonMockResp,
            jobTitle: $jobTitle,
            topic: $topic
          }
        ) {
          id
        }
      }
    `;

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