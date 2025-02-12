
import { takeLatest, put, call } from 'redux-saga/effects';
import { fetchInterviewsStart, fetchInterviewsSuccess, fetchInterviewsFailure, deleteInterviewFailure, deleteInterviewStart, deleteInterviewSuccess  } from '../slices/interviewSlices';
import { fetchQuestionsStart, fetchQuestionsSuccess, fetchQuestionsFailure} from '../slices/questionSlice';
import { gql } from '@apollo/client';
import client from '../../utils/apolloClient';

import { PayloadAction } from '@reduxjs/toolkit';




function* fetchInterviewsSaga(action:PayloadAction<string>) {
  try {

    const GET_USER_INTERVIEWS = gql`
query GetUserInterviews(
  $userId: String!
) {
  interviews(
    where: {
      user_id: { _eq: $userId }
    }
    order_by: { created_at: desc }
  ) {
    id
    jsonMockResp
    jobTitle
    topic
    created_at
  }
}
`;

    
    const { data } = yield call(client.query, {
      query: GET_USER_INTERVIEWS,
      variables: { userId: action.payload },
    });

    yield put(fetchInterviewsSuccess(data.interviews));
  } catch (error) {
    yield put(fetchInterviewsFailure("error fetching interviews"));
  }
}

function* deleteInterviewSaga(action:any){

    try{
        const DELETE_INTERVIEW = gql`
  mutation deleteInterview($id: uuid!) {
    delete_interviews(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

yield call(client.mutate,{
    mutation : DELETE_INTERVIEW,
    variables : {id : action.payload},
    
})
    yield put(deleteInterviewSuccess(action.payload))
    //window.location.reload();
}catch(error){

    yield put(deleteInterviewFailure("Error deleting interview"))
}

}

function* fetchQuestionsSaga() {
    try {
      const GET_PENDING_QUESTIONS = gql`
        query GetPendingQuestions {
          questions(where: { status: { _eq: "pending" } }) {
            id
            question
            topic
            user_id
          }
        }
      `;
  
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
  
  
export function* watchDeleteInterview(){
    yield takeLatest(deleteInterviewStart.type, deleteInterviewSaga)
}

export function* watchFetchQuestions() {
    yield takeLatest(fetchQuestionsStart.type, fetchQuestionsSaga);
  }


