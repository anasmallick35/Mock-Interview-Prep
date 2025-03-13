import reducer, {
  createInterviewStart,
  createInterviewSuccess,
  createInterviewFailure,
} from "./";

describe("takeInterviewSlice reducer", () => {
  const initialState = {
    loading: false,
    error: null,
    interviewId: null,
  };

  it("should handle createInterviewStart", () => {
    const action = createInterviewStart({
      combinedQuestions: [],
      jobTitle: "Frontend Developer",
      topic: "React",
      userId: "12345",
    });

    const nextState = reducer(initialState, action);

    expect(nextState).toEqual({
      loading: true,
      error: null,
      interviewId: null,
    });
  });

  it("should handle createInterviewSuccess", () => {
    const action = createInterviewSuccess("abcd-1234");
    const nextState = reducer(initialState, action);

    expect(nextState).toEqual({
      loading: false,
      error: null,
      interviewId: "abcd-1234",
    });
  });

  it("should handle createInterviewFailure", () => {
    const action = createInterviewFailure("Something went wrong");
    const nextState = reducer(initialState, action);

    expect(nextState).toEqual({
      loading: false,
      error: "Something went wrong",
      interviewId: null,
    });
  });
});
