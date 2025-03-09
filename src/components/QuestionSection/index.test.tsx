import { render, screen, fireEvent } from "@testing-library/react";
import QuestionSection from ".";
import "@testing-library/jest-dom";
import { useSelector } from "react-redux";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

describe("QuestionSection Component", () => {
  const mockSetActiveQuestionIndex = jest.fn();

  const mockQuestions = [
    { question: "What is React?" },
    { question: "What is a closure in JavaScript?" },
    { question: "Explain event delegation." },
  ];

  const mockState = {
    interviewPage: {
      questions: mockQuestions,
      activeQuestionIndex: 0,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useSelector as unknown as jest.Mock).mockImplementation((selector) => selector(mockState));
  });

  test("renders questions correctly", () => {
    render(
      <QuestionSection
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
        setActiveQuestionIndex={mockSetActiveQuestionIndex}
      />
    );

    fireEvent.click(screen.getByText("Question #2"));
    expect(mockSetActiveQuestionIndex).toHaveBeenCalledWith(1);
  });

  test("displays the correct active question", () => {
    render(
      <QuestionSection
        setActiveQuestionIndex={mockSetActiveQuestionIndex}
      />
    );

    expect(screen.getByText("What is React?")).toBeInTheDocument();
  });

  test("displays 'No questions available' when the question list is empty", () => {
    const emptyState = {
      interviewPage: {
        questions: [],
        activeQuestionIndex: 0,
      },
    };

    (useSelector as unknown as jest.Mock).mockImplementation((selector) => selector(emptyState));

    render(
      <QuestionSection
        setActiveQuestionIndex={mockSetActiveQuestionIndex}
      />
    );

    expect(screen.getByText("No questions available.")).toBeInTheDocument();
  });

});