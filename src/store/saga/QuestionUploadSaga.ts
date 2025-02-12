
import { takeLatest, put, call } from 'redux-saga/effects';
import { uploadQuestionStart, uploadQuestionSuccess, uploadQuestionFailure } from '../slices/QuestionUploadSlice';
import { gql } from '@apollo/client';
import client from '../../utils/apolloClient';

function* uploadQuestionSaga(action: ReturnType<typeof uploadQuestionStart>) {
  try {
    const { question, jobTitle, topic , userId } = action.payload;

    const UPLOAD_QUESTION = gql`
      mutation UploadQuestion($question: String!, $jobTitle: String!, $topic: String!, $userId: String!) {
        insert_questions_one(object: { question: $question, jobTitle: $jobTitle, topic: $topic, status: "pending", user_id: $userId }) {
          id,
          question,
          jobTitle
        }
      }
    `;

   const {data} =  yield call(client.mutate, {
      mutation: UPLOAD_QUESTION,
      variables: {
        question,
        jobTitle,
        topic,
        userId: userId
      },
    });


    yield put(uploadQuestionSuccess([data.question])); 
  } catch (error) {
    yield put(uploadQuestionFailure("error uploading questions"));
  }
}

export function* watchUploadQuestion() {
  yield takeLatest(uploadQuestionStart.type, uploadQuestionSaga);
}

