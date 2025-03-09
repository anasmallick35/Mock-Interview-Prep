
import {  watchFetchInterview } from "./"
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import interviewPageReducer from '@/redux/slices/InterviewPageSlices';
import takeInterviewReducer from '@/redux/slices/TakeInterviewSlice';
import client from '@/utils/apolloClient';

jest.mock("@/utils/apolloClient", () => {
    const mockClient = {
      query: jest.fn(),
    };
    return {
      __esModule: true,
      default: mockClient,
    };
  });
const mockedClient = client as jest.Mocked<typeof client>;

const mockInterviewData = {
  id: '1',
  title: 'Mock Interview',
  jsonMockResp: JSON.stringify({
    questions: [{ id: 1, text: 'What is a saga?' }],
  }),
};


describe('Saga: fetchInterviewPageSaga - INTEGRATION TEST', () => {
    it('updates the redux store correctly', async () => {
      const sagaMiddleware = createSagaMiddleware();
  
      const store = configureStore({
        reducer: {
          interviewPage: interviewPageReducer,
          takeInterview: takeInterviewReducer,
        },
        middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
      });
  
      mockedClient.query.mockResolvedValueOnce({
        data: {
          interviews: [mockInterviewData],
        },
        loading: false,
        networkStatus: 7,
      });
  
      sagaMiddleware.run(watchFetchInterview);
  
      store.dispatch({ type: 'interview/fetchInterview', payload: '1' });
  
    
      await new Promise((res) => setTimeout(res, 0));
  
      const interviewState = store.getState().interviewPage;
  
      expect(interviewState.loading).toBe(false);
      expect(interviewState.questions).toEqual([{ id: 1, text: 'What is a saga?' }]);
      expect(interviewState.interviewDetails).toEqual(mockInterviewData);
      expect(interviewState.error).toBeNull();
    });
  
    it('sets error in store on failure', async () => {
      const sagaMiddleware = createSagaMiddleware();
  
      const store = configureStore({
        reducer: {
          interviewPage: interviewPageReducer,
          takeInterview: takeInterviewReducer,
        },
        middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
      });
  
      mockedClient.query.mockRejectedValueOnce(new Error('Something failed'));
  
      sagaMiddleware.run(watchFetchInterview);
  
      store.dispatch({ type: 'interview/fetchInterview', payload: 'fail' });
  
      await new Promise((res) => setTimeout(res, 0));
  
      const state = store.getState().interviewPage;
  
      expect(state.error).toBe('Interview not fetched');
      expect(state.loading).toBe(false);
    });
  });
  