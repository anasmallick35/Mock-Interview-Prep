import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import StartInterviewComponent from ".";
import { StartInterviewProps } from "./types";
import '@testing-library/jest-dom'

// Mocks
jest.mock("@/components/Button", () => (props: any) => (
  <button onClick={props.onClick}>{props.children}</button>
));

jest.mock("@/components/QuestionSection", () => (props: any) => (
  <div data-testid="question-section" onClick={() => props.setActiveQuestionIndex(1)}>Mock QuestionSection</div>
));

jest.mock("@/containers/RecordAnswerSection", () => () => (
  <div data-testid="record-section">Mock RecordSection</div>
));

jest.mock("@/components/Spinner", () => ({
  Spinner: () => <div>Loading Spinner...</div>,
}));

describe("StartInterviewComponent", () => {
  const mockQuestions = [
    { id: 1, question: "What is React?" },
    { id: 2, question: "What is TypeScript?" },
  ];

  const baseProps: StartInterviewProps = {
    loading: false,
    error: false,
    mockInterviewQuestions: mockQuestions,
    activeQuestionIndex: 0,
    setActiveQuestionIndex: jest.fn(),
    interviewDetails: { id: "12345" },
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state", () => {
    render(<StartInterviewComponent {...baseProps} loading={true} />, { wrapper: MemoryRouter });
    expect(screen.getByText("Loading Spinner...")).toBeInTheDocument();
  });

  it("renders error state", () => {
    render(<StartInterviewComponent {...baseProps} error={true} />, { wrapper: MemoryRouter });
    expect(screen.getByText("Error loading interview details")).toBeInTheDocument();
  });

  it("renders question and record sections", () => {
    render(<StartInterviewComponent {...baseProps} />, { wrapper: MemoryRouter });

    expect(screen.getByTestId("question-section")).toBeInTheDocument();
    expect(screen.getByTestId("record-section")).toBeInTheDocument();
  });

  it("does not render left arrow when activeQuestionIndex is 0", () => {
    render(<StartInterviewComponent {...baseProps} />, { wrapper: MemoryRouter });
    expect(screen.queryByTestId("left-arrow")).not.toBeInTheDocument();
  });
 

  it("renders 'End Interview' button with correct link", () => {
    render(<StartInterviewComponent {...baseProps} />, { wrapper: MemoryRouter });

    const endButton = screen.getByRole("button", { name: /End Interview/i });
    expect(endButton).toBeInTheDocument();

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/start-interview/12345/feedback");
  });
});
