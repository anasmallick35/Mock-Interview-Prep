import { runSaga } from "redux-saga";
import * as apolloClient from "@/utils/apolloClient";
import {
  fetchPendingQuestions,
  approveQuestion,
  rejectQuestion,
  deleteRejectedQuestions,
} from ".";
import {
  fetchPendingQuestionsSuccess,
  fetchPendingQuestionsFailure,
  approveQuestionSuccess,
  rejectQuestionSuccess,
  deleteRejectedQuestionsSuccess,
} from "../../slices/AdminSlice";

jest.mock("@/utils/apolloClient", () => ({
  __esModule: true,
  default: {
    query: jest.fn(),
    mutate: jest.fn(),
  },
}));

const mockedClient = apolloClient.default;

describe("Admin Sagas", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("fetchPendingQuestions - success", async () => {
    const dispatched: any[] = [];
    const mockQuestions = [{ id: "1", question: "Sample", topic: "React" }];

    (mockedClient.query as jest.Mock).mockResolvedValue({
      data: { questions: mockQuestions },
    });

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      fetchPendingQuestions
    ).toPromise();

    expect(dispatched).toContainEqual(
      fetchPendingQuestionsSuccess(mockQuestions)
    );
  });

  it("fetchPendingQuestions - failure", async () => {
    const dispatched: any[] = [];
    (mockedClient.query as jest.Mock).mockRejectedValue(new Error("Failed"));

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      fetchPendingQuestions
    ).toPromise();

    expect(dispatched).toContainEqual(fetchPendingQuestionsFailure("Failed"));
  });

  it("approveQuestion - success", async () => {
    const dispatched: any[] = [];
    const action = { type: "approveQuestionStart", payload: "123" };

    (mockedClient.mutate as jest.Mock).mockResolvedValueOnce({
      data: {
        update_questions_by_pk: {
          user_id: "user123",
        },
      },
    });

    (mockedClient.mutate as jest.Mock).mockResolvedValueOnce({});

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      approveQuestion,
      action
    ).toPromise();

    expect(dispatched).toContainEqual(approveQuestionSuccess("123"));
  });

  it("rejectQuestion - success", async () => {
    const dispatched: any[] = [];
    const action = { type: "rejectQuestionStart", payload: "456" };

    (mockedClient.mutate as jest.Mock).mockResolvedValue({});

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      rejectQuestion,
      action
    ).toPromise();

    expect(dispatched).toContainEqual(rejectQuestionSuccess("456"));
  });

  it("deleteRejectedQuestions - success", async () => {
    const dispatched: any[] = [];

    (mockedClient.mutate as jest.Mock).mockResolvedValue({});

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      deleteRejectedQuestions
    ).toPromise();

    expect(dispatched).toContainEqual(deleteRejectedQuestionsSuccess());
  });
});
