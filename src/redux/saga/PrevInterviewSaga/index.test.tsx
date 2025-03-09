import { runSaga } from "redux-saga";
import { fetchInterviewsSaga, deleteInterviewSaga } from ".";
import { fetchInterviewsSuccess, fetchInterviewsFailure, deleteInterviewSuccess, deleteInterviewFailure } from "../../slices/PastInterviewSlices";
import client from "@/utils/apolloClient";


jest.mock("@/utils/apolloClient", () => ({
  query: jest.fn(),
  mutate: jest.fn(),
  ApolloClient: jest.fn().mockImplementation(() => ({
    query: jest.fn(),
    mutate: jest.fn(),
  })),
  InMemoryCache: jest.fn(),
  HttpLink: jest.fn().mockImplementation(() => ({ uri: 'mocked-uri' })),
}));

describe("fetchInterviewsSaga", () => {
  test("fetches interviews successfully", async () => {
    const dispatched: any[] = [];
    const mockData = { interviews: [{ id: '1', jobTitle: 'React Dev', userId: '3342225dasf', topic: 'Reactdev', interviewId: 'e424waffada', jsonMockResp: 'fefsefas', created_at: '02-09-2025' }] };

    (client.query as jest.Mock).mockResolvedValue({ data: mockData });

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      fetchInterviewsSaga,
      {
        payload: "user123",
        type: "string"
      }
    ).toPromise();

    expect(dispatched).toContainEqual(fetchInterviewsSuccess(mockData.interviews));
  });

  test("handles fetch failure", async () => {
    const dispatched: any[] = [];

    (client.query as jest.Mock).mockRejectedValue(new Error("API Error"));

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      fetchInterviewsSaga,
      {
        payload: "user123",
        type: "string"
      }
    ).toPromise();

    expect(dispatched).toContainEqual(fetchInterviewsFailure("error fetching interviews"));
  });
});

describe("deleteInterviewSaga", () => {
  test("deletes an interview successfully", async () => {
    const dispatched: any[] = [];

    (client.mutate as jest.Mock).mockResolvedValue({ data: { delete_interviews: { affected_rows: 1 } } });

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      deleteInterviewSaga,
      { payload: "1" }
    ).toPromise();

    expect(dispatched).toContainEqual(deleteInterviewSuccess("1"));
  });

  test("handles delete failure", async () => {
    const dispatched: any[] = [];

    (client.mutate as jest.Mock).mockRejectedValue(new Error("Mutation Error"));

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      deleteInterviewSaga,
      { payload: "1" }
    ).toPromise();

    expect(dispatched).toContainEqual(deleteInterviewFailure("Error deleting interview and feedback"));
  });
});
