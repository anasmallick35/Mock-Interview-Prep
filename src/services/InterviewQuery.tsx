import { gql } from "@apollo/client";

export const GET_INTERVIEW = gql`
  query GetInterview($interviewId: uuid!) {
    interviews(where: { id: { _eq: $interviewId } }) {
      id
      user_id
      jsonMockResp
      created_at
      jobTitle
      topic
    }
  }
`;


export const GET_USER = gql`
  query GetUserRole($userId: String!) {
    users_by_pk(id: $userId) {
      role,
      name,
      picture,
      email
    }
  }
`;

export const GET_FEEDBACK_FROM_USER_ANSWERS = gql`
  query getFeedback(
  $interviewId : uuid!
  ){
  userAnswer(where : {mockId : {_eq : $interviewId}})
  {
    id
    feedback
    correctAnswer
    question
    rating
    userAnswer
  }
  }
`


export const GET_PENDING_QUESTIONS = gql`
  query GetPendingQuestions {
    questions(where: { status: { _eq: "pending" } }) {
      id
      question
      topic
      user_id
    }
  }
`;


export const GET_QUESTION = gql`
  query getUserUploadQuestions($jobTitle: String!, $topic: String!) {
    questions(
      where: {
        jobTitle: { _ilike: $jobTitle }
        topic: { _ilike: $topic }
        status: { _eq: "approved" }
      }
    ) {
      id
      question
    }
  }
`;