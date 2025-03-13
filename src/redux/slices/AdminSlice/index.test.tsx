import reducer, {
  fetchPendingQuestionsStart,
  fetchPendingQuestionsSuccess,
  fetchPendingQuestionsFailure,
  approveQuestionSuccess,
  rejectQuestionSuccess,
  deleteRejectedQuestionsSuccess,
} from "../../slices/AdminSlice";

describe("AdminSlice Reducer", () => {
  const initialState = {
    pendingQuestions: [],
    approvedQuestions: [],
    rejectedQuestions: [],
    loading: false,
    error: null,
  };

  it("should handle fetchPendingQuestionsStart", () => {
    const state = reducer(initialState, fetchPendingQuestionsStart());
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it("should handle fetchPendingQuestionsSuccess", () => {
    const questions = [{ id: "1", question: "What is React?", topic: "React" }];
    const state = reducer(
      initialState,
      fetchPendingQuestionsSuccess(questions)
    );
    expect(state.pendingQuestions).toEqual(questions);
    expect(state.loading).toBe(false);
  });

  it("should handle fetchPendingQuestionsFailure", () => {
    const error = "Failed to fetch";
    const state = reducer(initialState, fetchPendingQuestionsFailure(error));
    expect(state.error).toBe(error);
    expect(state.loading).toBe(false);
  });

  it("should handle approveQuestionSuccess", () => {
    const prevState = {
      ...initialState,
      pendingQuestions: [{ id: "1", question: "Q", topic: "React" }],
    };
    const state = reducer(prevState, approveQuestionSuccess("1"));
    expect(state.pendingQuestions).toEqual([]);
    expect(state.loading).toBe(false);
  });

  it("should handle rejectQuestionSuccess", () => {
    const prevState = {
      ...initialState,
      pendingQuestions: [{ id: "1", question: "Q", topic: "React" }],
    };
    const state = reducer(prevState, rejectQuestionSuccess("1"));
    expect(state.pendingQuestions).toEqual([]);
    expect(state.loading).toBe(false);
  });

  it("should handle deleteRejectedQuestionsSuccess", () => {
    const prevState = {
      ...initialState,
      rejectedQuestions: [{ id: "9", question: "Old", topic: "HTML" }],
    };
    const state = reducer(prevState, deleteRejectedQuestionsSuccess());
    expect(state.rejectedQuestions).toEqual([]);
  });
});
