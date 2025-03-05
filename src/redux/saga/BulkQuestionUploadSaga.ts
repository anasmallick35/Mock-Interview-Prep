
import { takeLatest, put, call } from 'redux-saga/effects';
import { uploadQuestionStart, uploadQuestionSuccess, uploadQuestionFailure } from '../slices/QuestionUploadSlice';
import client from '../../utils/apolloClient';
import { BULK_QUESTION_UPLOAD } from '@/services/InterviewMutation';

function* uploadQuestionSaga(action: ReturnType<typeof uploadQuestionStart>) {
  try {
    const { question, jobTitle, topic , userId } = action.payload;

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

