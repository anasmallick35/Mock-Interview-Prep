import { call, put } from "redux-saga/effects";
import { createInterviewSaga } from ".";
import {
  createInterviewStart,
  createInterviewFailure,
} from "@/redux/slices/TakeInterviewSlice";
import client from "@/utils/apolloClient";
import { INSERT_INTERVIEW } from "@/services/InterviewMutation";

jest.mock("uuid", () => ({
  v4: jest.fn(() => "mock-uuid-1234"),
}));

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

describe("createInterviewSaga", () => {
  const mockPayload = {
    combinedQuestions: [{ q: "What is Redux?" }],
    jobTitle: "Frontend Developer",
    topic: "Redux",
    userId: "12345",
  };

  const action = createInterviewStart(mockPayload);

  it("should handle error and dispatch failure", () => {
    const generator = createInterviewSaga(action);

    expect(generator.next().value).toEqual(
      call(client.mutate, {
        mutation: INSERT_INTERVIEW,
        variables: {
          id: "mock-uuid-1234",
          userId: mockPayload.userId,
          jsonMockResp: JSON.stringify({
            questions: mockPayload.combinedQuestions,
          }),
          jobTitle: mockPayload.jobTitle,
          topic: mockPayload.topic,
        },
      })
    );

    const error = new Error("Network error");
    expect(generator.throw!(error).value).toEqual(
      put(createInterviewFailure("error in creating interview"))
    );

    expect(generator.next().done).toBe(true);
  });
});
