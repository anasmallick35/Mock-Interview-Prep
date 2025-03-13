import { call, put } from "redux-saga/effects";
import { uploadQuestionSaga } from "./"; 
import {
  uploadQuestionStart,
  uploadQuestionSuccess,
  uploadQuestionFailure,
} from "../../slices/QuestionUploadSlice";
import client from "../../../utils/apolloClient";
import { UPLOAD_QUESTION } from "@/services/InterviewMutation";

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
  

describe("uploadQuestionSaga", () => {
  const mockPayload = {
    question: "What is Redux?",
    jobTitle: "Frontend Developer",
    topic: "Redux",
    userId: "12345",
  };

  const action = uploadQuestionStart(mockPayload);

  it("should call mutation and dispatch success", () => {
    const generator = uploadQuestionSaga(action);

   
    expect(generator.next().value).toEqual(
      call(client.mutate, {
        mutation: UPLOAD_QUESTION,
        variables: {
          question: mockPayload.question,
          jobTitle: mockPayload.jobTitle,
          topic: mockPayload.topic,
          userId: mockPayload.userId,
        },
      })
    );

  
    const response = {
      insert_questions_one: {
        question: mockPayload.question,
        jobTitle: mockPayload.jobTitle,
        topic: mockPayload.topic,
      },
    };

    expect(generator.next({ data: response }).value).toEqual(
      put(uploadQuestionSuccess([response.insert_questions_one]))
    );

   
    expect(generator.next().done).toBe(true);
  });

  it("should handle error and dispatch failure", () => {
    const generator = uploadQuestionSaga(action);

   
    expect(generator.next().value).toEqual(
      call(client.mutate, {
        mutation: UPLOAD_QUESTION,
        variables: {
          question: mockPayload.question,
          jobTitle: mockPayload.jobTitle,
          topic: mockPayload.topic,
          userId: mockPayload.userId,
        },
      })
    );

   
    const error = new Error("Something went wrong");

    expect(generator.throw!(error).value).toEqual(
      put(uploadQuestionFailure("error uploading questions"))
    );

    
    expect(generator.next().done).toBe(true);
  });
});
