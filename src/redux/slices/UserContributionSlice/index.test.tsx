import reducer, {
    fetchUserQuestionsStart,
    fetchUserQuestionsSuccess,
    fetchUserQuestionsFailure,
    deleteQuestionStart,
    deleteQuestionSuccess,
    deleteQuestionFailure,
  } from ".";
  
  const initialState = {
    questions: [],
    loading: false,
    error: null,
    points: 0,
  };
  
  const mockQuestion = {
    id: "1",
    question: "What is Redux?",
    topic: "React",
    status: "pending",
  };
  
  describe("userQuestionsSlice reducer", () => {
    it("should handle fetchUserQuestionsStart", () => {
      const state = reducer(initialState, fetchUserQuestionsStart());
      expect(state).toEqual({
        ...initialState,
        loading: true,
        error: null,
      });
    });
  
    it("should handle fetchUserQuestionsSuccess", () => {
      const state = reducer(initialState, fetchUserQuestionsSuccess([mockQuestion]));
      expect(state).toEqual({
        ...initialState,
        questions: [mockQuestion],
        loading: false,
      });
    });
  
    it("should handle fetchUserQuestionsFailure", () => {
      const error = "Failed to fetch";
      const state = reducer(initialState, fetchUserQuestionsFailure(error));
      expect(state).toEqual({
        ...initialState,
        loading: false,
        error,
      });
    });
  
    it("should handle deleteQuestionStart", () => {
      const state = reducer(initialState, deleteQuestionStart("1"));
      expect(state.loading).toBe(true);
    });
  
    it("should handle deleteQuestionSuccess", () => {
      const startState = {
        ...initialState,
        questions: [mockQuestion],
      };
      const state = reducer(startState, deleteQuestionSuccess("1"));
      expect(state.questions).toEqual([]);
      expect(state.loading).toBe(false);
    });
  
    it("should handle deleteQuestionFailure", () => {
      const error = "Delete failed";
      const state = reducer(initialState, deleteQuestionFailure(error));
      expect(state.error).toBe(error);
      expect(state.loading).toBe(false);
    });
  });
  