import { call, put } from "redux-saga/effects";
import {
  fetchUserQuestionsSuccess,
  fetchUserQuestionsFailure,
  deleteQuestionSuccess,
  deleteQuestionFailure,
} from "@/redux/slices/UserContributionSlice";
import { fetchUserQuestionsSaga, deleteQuestionSaga } from ".";
import client from "@/utils/apolloClient";
import { FETCH_USER_QUESTIONS } from "@/services/InterviewQuery";
import { DELETE_USER_QUESTION } from "@/services/InterviewMutation";

jest.mock("@/utils/apolloClient", () => {
    const mockClient = {
      mutate: jest.fn(),
      query: jest.fn(),
    };
    return {
      __esModule: true,
      default: mockClient,
    };
  });

describe("fetchUserQuestionsSaga", () => {
  const userId = "123";
  const action = { payload: userId, type: "userQuestions/fetchUserQuestionsStart" };

  it("should fetch and dispatch success", () => {
    const generator = fetchUserQuestionsSaga(action as any);

    expect(generator.next().value).toEqual(call(client.query, {
      query: FETCH_USER_QUESTIONS,
      variables: { userId },
      fetchPolicy: "network-only",
    }));

    const mockData = { data: { questions: [{ id: "q1", question: "Test?", topic: "JS", status: "active" }] } };

    expect(generator.next(mockData).value).toEqual(put(fetchUserQuestionsSuccess(mockData.data.questions)));
    expect(generator.next().done).toBe(true);
  });

  it("should handle failure", () => {
    const generator = fetchUserQuestionsSaga(action as any);
    generator.next(); // call

    const error = new Error("Fetch error");
    expect(generator.throw!(error).value).toEqual(put(fetchUserQuestionsFailure("Error fetching user questions")));
  });
});

describe("deleteQuestionSaga", () => {
  const questionId = "123";
  const action = { payload: questionId };

  it("should call delete mutation and dispatch success", () => {
    const generator = deleteQuestionSaga(action as any);

    expect(generator.next().value).toEqual(
      call(client.mutate, {
        mutation: DELETE_USER_QUESTION,
        variables: { id: questionId },
        refetchQueries: [{ query: FETCH_USER_QUESTIONS }],
      })
    );

    expect(generator.next().value).toEqual(put(deleteQuestionSuccess(questionId)));
    expect(generator.next().done).toBe(true);
  });

  it("should handle delete failure", () => {
    const generator = deleteQuestionSaga(action as any);
    generator.next(); 

    const error = new Error("Delete error");
    expect(generator.throw!(error).value).toEqual(put(deleteQuestionFailure("Error deleting question")));
  });
});
