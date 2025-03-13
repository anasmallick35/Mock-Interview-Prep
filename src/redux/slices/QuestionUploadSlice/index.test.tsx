import questionUploadReducer, {
    uploadQuestionStart,
    uploadQuestionSuccess,
    uploadQuestionFailure,
    QuestionUploadState,
  } from "."; 
  
  describe("questionUploadSlice", () => {
    const initialState: QuestionUploadState = {
      loading: false,
      error: null,
      questions: [],
    };
  
    const mockQuestion = {
      question: "What is Redux?",
      jobTitle: "Frontend Developer",
      topic: "Redux",
    };
  
    it("should handle uploadQuestionStart", () => {
      const action = uploadQuestionStart({
        question: mockQuestion.question,
        jobTitle: mockQuestion.jobTitle,
        topic: mockQuestion.topic,
        userId: "123",
      });
  
      const state = questionUploadReducer(initialState, action);
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });
  
    it("should handle uploadQuestionSuccess", () => {
      const action = uploadQuestionSuccess([mockQuestion]);
      const state = questionUploadReducer(
        { ...initialState, loading: true },
        action
      );
  
      expect(state.loading).toBe(false);
      expect(state.questions).toEqual([mockQuestion]);
      expect(state.error).toBeNull();
    });
  
    it("should handle uploadQuestionFailure", () => {
      const errorMsg = "Upload failed";
      const action = uploadQuestionFailure(errorMsg);
      const state = questionUploadReducer(
        { ...initialState, loading: true },
        action
      );
  
      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMsg);
    });
  });
  