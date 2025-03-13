import { takeLatest, put, call } from "redux-saga/effects";
import {
  uploadQuestionStart,
  uploadQuestionSuccess,
  uploadQuestionFailure,
} from "../../slices/QuestionUploadSlice";
import client from "../../../utils/apolloClient";
import { UPLOAD_QUESTION } from "@/services/InterviewMutation";

export function* uploadQuestionSaga(action: ReturnType<typeof uploadQuestionStart>) {
  try {
    const { question, jobTitle, topic, userId } = action.payload;

    const { data } = yield call(client.mutate, {
      mutation: UPLOAD_QUESTION,
      variables: {
        question,
        jobTitle,
        topic,
        userId: userId,
      },
    });
    console.log(data.insert_questions_one
    )

    yield put(uploadQuestionSuccess([data.insert_questions_one]));
  } catch (error) {
    yield put(uploadQuestionFailure("error uploading questions"));
  }
}

export function* watchUploadQuestion() {
  yield takeLatest(uploadQuestionStart.type, uploadQuestionSaga);
}
