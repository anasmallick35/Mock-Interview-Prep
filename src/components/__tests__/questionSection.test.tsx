import { render, screen, fireEvent } from "@testing-library/react";
import QuestionSection from "../QuestionSection";
import "@testing-library/jest-dom";

describe("QuestionSection Component", () => {
  const mockSetActiveQuestionIndex = jest.fn();

  const mockQuestions = {
    questions: [
      { question: "What is React?" },
      { question: "What is a closure in JavaScript?" },
      { question: "Explain event delegation." },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders questions correctly", () => {
    render(
      <QuestionSection
        mockInterviewQuestions={mockQuestions}
        activeQuestionIndex={0}
        setActiveQuestionIndex={mockSetActiveQuestionIndex}
      />
    );

    expect(screen.getByText("Question #1")).toBeInTheDocument();
    expect(screen.getByText("Question #2")).toBeInTheDocument();
    expect(screen.getByText("Question #3")).toBeInTheDocument();
  });

  test("updates active question index when a question is clicked", () => {
    render(
      <QuestionSection
        mockInterviewQuestions={mockQuestions}
        activeQuestionIndex={0}
        setActiveQuestionIndex={mockSetActiveQuestionIndex}
      />
    );

    fireEvent.click(screen.getByText("Question #2"));
    expect(mockSetActiveQuestionIndex).toHaveBeenCalledWith(1);
  });

  test("displays the correct active question", () => {
    render(
      <QuestionSection
        mockInterviewQuestions={mockQuestions}
        activeQuestionIndex={1}
        setActiveQuestionIndex={mockSetActiveQuestionIndex}
      />
    );

    expect(screen.getByText("What is a closure in JavaScript?")).toBeInTheDocument();
  });

  test("displays 'No questions available' when the question list is empty", () => {
    render(
      <QuestionSection
        mockInterviewQuestions={{ questions: [] }}
        activeQuestionIndex={0}
        setActiveQuestionIndex={mockSetActiveQuestionIndex}
      />
    );

    expect(screen.getByText("No questions available.")).toBeInTheDocument();
  });

  test("renders the note section correctly", () => {
    render(
      <QuestionSection
        mockInterviewQuestions={mockQuestions}
        activeQuestionIndex={0}
        setActiveQuestionIndex={mockSetActiveQuestionIndex}
      />
    );

    expect(screen.getByText("Note:")).toBeInTheDocument();
    expect(screen.getByText(/Click on Record Answer/)).toBeInTheDocument();
  });
});
