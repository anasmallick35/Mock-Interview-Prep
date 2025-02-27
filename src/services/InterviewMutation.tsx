import { gql } from "@apollo/client";

export const DELETE_FEEDBACK = gql`
  mutation deleteFeedback($mockId: uuid!) {
    delete_userAnswer(where: { mockId: { _eq: $mockId } }) {
      affected_rows
    }
  }
`;
export const DELETE_INTERVIEW = gql`
  mutation deleteInterview($id: uuid!) {
    delete_interviews(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

export const DELETE_USER_QUESTION = gql`
  mutation deleteUserQuestions($id: uuid!) {
    delete_questions(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

export const APPROVE_QUESTION = gql`
  mutation ApproveQuestion($id: uuid!) {
    update_questions_by_pk(
      pk_columns: { id: $id }
      _set: { status: "approved" }
    ) {
      id
    }
  }
`;

export const REJECT_QUESTION = gql`
  mutation RejectQuestion($id: uuid!) {
    update_questions_by_pk(
      pk_columns: { id: $id }
      _set: { status: "rejected", rejected_at: "now()" }
    ) {
      id
    }
  }
`;

export const DELETE_REJECTED_QUESTIONS = gql`
  mutation DeleteOldRejectedQuestions {
    delete_questions(
      where: { status: { _eq: "rejected" }, rejected_at: { _lt: "now()" } }
    ) {
      affected_rows
    }
  }
`;

export const INSERT_FEEDBACK_RESP = gql`
  mutation insertFeedback(
    $question: String!
    $correctAnswer: String!
    $userAnswer: String
    $feedback: String
    $rating: float8!
    $userEmail: String!
    $mockId: uuid!
  ) {
    insert_userAnswer_one(
      object: {
        question: $question
        correctAnswer: $correctAnswer
        userAnswer: $userAnswer
        feedback: $feedback
        rating: $rating
        userEmail: $userEmail
        mockId: $mockId
      }
    ) {
      id
    }
  }
`;

export const BULK_QUESTION_UPLOAD = gql`
  mutation BulkUploadQuestion($objects: [questions_insert_input!]!) {
    insert_questions(objects: $objects) {
      affected_rows
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($userId: String!, $name: String!, $picture: String!) {
    update_users_by_pk(
      pk_columns: { id: $userId }
      _set: { name: $name, picture: $picture }
    ) {
      id
      name
      picture
    }
  }
`;
export const UPLOAD_QUESTION = gql`
  mutation UploadQuestion(
    $question: String!
    $jobTitle: String!
    $topic: String!
    $userId: String!
  ) {
    insert_questions_one(
      object: {
        question: $question
        jobTitle: $jobTitle
        topic: $topic
        status: "pending"
        user_id: $userId
      }
    ) {
      id
      question
      jobTitle
    }
  }
`;

export const INSERT_INTERVIEW = gql`
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
