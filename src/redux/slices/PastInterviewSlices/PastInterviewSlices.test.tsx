import reducer, {
    fetchInterviewsStart,
    fetchInterviewsSuccess,
    fetchInterviewsFailure,
    deleteInterviewStart,
    deleteInterviewSuccess,
    deleteInterviewFailure,
  } from "./interviewSlices"
  
  describe("interviewSlice Reducer", () => {
    const initialState = { interviews: [], loading: false, error: null };
  
    test("handles fetchInterviewsStart", () => {
      const state = reducer(initialState, fetchInterviewsStart("user123"));
      expect(state.loading).toBe(true);
      expect(state.error).toBe(null);
    });
  
    test("handles fetchInterviewsSuccess", () => {
      const mockInterviews = [{ id: "1", jobTitle: "React Dev", userId: "3342225dasf", topic : "Reactdev", interviewId:"e424waffada", jsonMockResp:"fefsefas",created_at: "02-09-2025" }];
      const state = reducer(initialState, fetchInterviewsSuccess(mockInterviews));
      expect(state.interviews).toEqual(mockInterviews);
      expect(state.loading).toBe(false);
    });
  
    test("handles fetchInterviewsFailure", () => {
      const state = reducer(initialState, fetchInterviewsFailure("API Error"));
      expect(state.error).toBe("API Error");
      expect(state.loading).toBe(false);
    });
  
    test("handles deleteInterviewStart", () => {
      const state = reducer(initialState, deleteInterviewStart("1"));
      expect(state.loading).toBe(true);
    });
  
    test('handles deleteInterviewSuccess', () => {
      const state = reducer(
        {
          interviews: [
            { id: '1', jobTitle: 'React Dev', userId: '3342225dasf', topic: 'Reactdev', interviewId: 'e424waffada', jsonMockResp: 'fefsefas', created_at: '02-09-2025' },
            { id: '2', jobTitle: 'React Dev', userId: '3342225dsf', topic: 'Reacdev', interviewId: 'e424wafada', jsonMockResp: 'fefsefas', created_at: '02-09-2025' },
          ],
          loading: true,
          error: null,
        },
        deleteInterviewSuccess('1')
      );
      expect(state.interviews).toEqual([{ id: '2', jobTitle: 'React Dev', userId: '3342225dsf', topic: 'Reacdev', interviewId: 'e424wafada', jsonMockResp: 'fefsefas', created_at: '02-09-2025' }]);
      expect(state.loading).toBe(false);
    });
  
    test('handles deleteInterviewFailure', () => {
      const state = reducer(initialState, deleteInterviewFailure('Deletion Error'));
      expect(state.error).toBe('Deletion Error');
      expect(state.loading).toBe(false);
    });
  });