import { takeLatest, put, call } from "redux-saga/effects";
import {
  fetchUserQuestionsStart,
  fetchUserQuestionsSuccess,
  fetchUserQuestionsFailure,
  deleteQuestionSuccess,
  deleteQuestionFailure,
  deleteQuestionStart,
} from "../slices/UserQuestionsSlice";
import client from "../../utils/apolloClient";
import { FETCH_USER_QUESTIONS } from "@/services/InterviewQuery";
import { DELETE_USER_QUESTION } from "@/services/InterviewMutation";

function* fetchUserQuestionsSaga(action: ReturnType<typeof fetchUserQuestionsStart>) {
  try {
    const userId = action.payload;
    const { data } = yield call(client.query, {
      query: FETCH_USER_QUESTIONS,
      variables: {
        userId,
      },
      fetchPolicy: "network-only",
    });
    console.log('saga',data)

    yield put(fetchUserQuestionsSuccess(data.questions));
  } catch (error) {
    yield put(fetchUserQuestionsFailure("Error fetching user questions"));
  }
}

export function* deleteQuestionSaga(action:any) {
    try {
       yield call(client.mutate, {
        mutation: DELETE_USER_QUESTION,
        variables: { id: action.payload },
        refetchQueries: [{ query:FETCH_USER_QUESTIONS}],
      });
      
      yield put(deleteQuestionSuccess(action.payload));
     
    } catch (error) {
        console.log("Error is",error);
      yield put(deleteQuestionFailure("Error deleting question"));
    }
  }

export function* watchFetchUserQuestions() {
  yield takeLatest(fetchUserQuestionsStart.type, fetchUserQuestionsSaga);
}
export function* watchDeleteQuestions(){
    yield takeLatest(deleteQuestionStart.type, deleteQuestionSaga)
}