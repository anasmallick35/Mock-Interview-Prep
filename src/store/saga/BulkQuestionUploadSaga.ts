
import { takeLatest, put, call } from 'redux-saga/effects';
import { uploadQuestionStart, uploadQuestionSuccess, uploadQuestionFailure } from '../slices/QuestionUploadSlice';
import { gql } from '@apollo/client';
import client from '../../utils/apolloClient';

function* uploadQuestionSaga(action: ReturnType<typeof uploadQuestionStart>) {
  try {
    const { question, jobTitle, topic , userId } = action.payload;

    const BULK_QUESTION_UPLOAD = gql`
  mutation BulkUploadQuestion($objects: [questions_insert_input!]!) {
    insert_questions(objects: $objects) {
      affected_rows
    }
  }
`;

   const {data} =  yield call(client.mutate, {
      mutation: BULK_QUESTION_UPLOAD,
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

