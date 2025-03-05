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
export const FETCH_USER_QUESTIONS = gql`
query FetchUserQuestions($userId: String!) {
  questions(where: { user_id: { _eq: $userId } }) {
    id
    question
    jobTitle
    topic
    status
  }
}
`


export const GET_USER = gql`
  query GetUserRole($userId: String!) {
    users_by_pk(id: $userId) {
    id,
      role,
      name,
      picture,
      email,
      points
    }
  }
`;

export const GET_USER_BY_EMAIL = gql`
 query GetUserByEmail($email : String!){
  users(where: {email: {_eq: $email}}) {
    email
}
 }
`

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

export const GET_USER_INTERVIEWS = gql`
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

