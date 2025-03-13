import { configureStore } from '@reduxjs/toolkit';
import reducer, {
  setLoading,
  setError,
  setQuestions,
  setActiveQuestionIndex,
  setInterviewDetails,
} from '@/redux/slices/InterviewPageSlices';
import '@testing-library/jest-dom'

describe('InterviewPage Slice Reducers - Unit Tests', () => {
  const initialState = {
    loading: false,
    userAnswers: [],
    error: null,
    questions: [],
    activeQuestionIndex: 0,
    interviewDetails: null,
  };

  it('should handle setLoading', () => {
    const state = reducer(initialState, setLoading(true));
    expect(state.loading).toBe(true);
  });

  it('should handle setError', () => {
    const state = reducer(initialState, setError('Something went wrong'));
    expect(state.error).toBe('Something went wrong');
  });

  it('should handle setQuestions', () => {
    const questions = [{ id: 1, text: 'What is Redux?' }];
    const state = reducer(initialState, setQuestions(questions));
    expect(state.questions).toEqual(questions);
  });

  it('should handle setActiveQuestionIndex', () => {
    const state = reducer(initialState, setActiveQuestionIndex(2));
    expect(state.activeQuestionIndex).toBe(2);
  });

  it('should handle setInterviewDetails', () => {
    const interview = { id: 'abc', title: 'Mock Interview' };
    const state = reducer(initialState, setInterviewDetails(interview));
    expect(state.interviewDetails).toEqual(interview);
  });
});

describe('InterviewPage Slice - Integration Test', () => {
  it('should update store state correctly', () => {
    const store = configureStore({
      reducer: {
        interviewPage: reducer,
      },
    });

    const questions = [{ id: 1, text: 'Integration Test Q?' }];
    const interview = { id: 'int-001', title: 'Integration Interview' };

    store.dispatch(setLoading(true));
    store.dispatch(setError('An error'));
    store.dispatch(setQuestions(questions));
    store.dispatch(setActiveQuestionIndex(1));
    store.dispatch(setInterviewDetails(interview));

    const state = store.getState().interviewPage;

    expect(state.loading).toBe(true);
    expect(state.error).toBe('An error');
    expect(state.questions).toEqual(questions);
    expect(state.activeQuestionIndex).toBe(1);
    expect(state.interviewDetails).toEqual(interview);
  });
});
