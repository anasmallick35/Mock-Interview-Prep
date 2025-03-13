import { render, screen, fireEvent } from "@testing-library/react";
import FeedbackComponent from ".";
import "@testing-library/jest-dom";

jest.mock("@/components/Button", () => (props: any) => (
  <button
    onClick={props.onClick}
    className={props.className}
    data-testid="mock-button"
  >
    {props.children}
  </button>
));

jest.mock("lucide-react", () => ({
  ChevronsUpDown: jest.fn(() => <svg data-testid="Open Interview"></svg>),
}));

const sampleFeedback = [
  {
    question: "What is React?",
    userAnswer: "A library for styling",
    correctAnswer: "A library for building UIs",
    feedback: "You should understand the core purpose of React.",
    rating: "2/5",
  },
];

describe("FeedbackComponent", () => {
  const navigateMock = jest.fn();
  const handleToggleMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders 'No interview Feedback' when feedbackList is empty", () => {
    render(
      <FeedbackComponent
        feedbackList={[]}
        openIndex={-1}
        handleToggle={handleToggleMock}
        navigate={navigateMock}
      />
    );

    expect(screen.getByText(/No interview Feedback/i)).toBeInTheDocument();
  });

  it("renders feedback list when feedback is present", () => {
    render(
      <FeedbackComponent
        feedbackList={sampleFeedback}
        openIndex={-1}
        handleToggle={handleToggleMock}
        navigate={navigateMock}
      />
    );

    expect(
      screen.getByText(/Here is your interview feedback/i)
    ).toBeInTheDocument();

    expect(screen.getByText(sampleFeedback[0].question)).toBeInTheDocument();
  });

  it("calls handleToggle when a question is clicked", () => {
    render(
      <FeedbackComponent
        feedbackList={sampleFeedback}
        openIndex={-1}
        handleToggle={handleToggleMock}
        navigate={navigateMock}
      />
    );

    const questionButton = screen.getByText(sampleFeedback[0].question);
    fireEvent.click(questionButton);

    expect(handleToggleMock).toHaveBeenCalledWith(0);
  });

  it("displays answer details when the item is expanded", () => {
    render(
      <FeedbackComponent
        feedbackList={sampleFeedback}
        openIndex={0}
        handleToggle={handleToggleMock}
        navigate={navigateMock}
      />
    );

    expect(screen.getByText(/Rating:/)).toBeInTheDocument();
    expect(screen.getByText(/Your Answer:/)).toBeInTheDocument();
    expect(screen.getByText(/Correct Answer:/)).toBeInTheDocument();
    expect(screen.getByText(/Feedback:/)).toBeInTheDocument();
  });

  it("calls navigate when 'Go Home' button is clicked", () => {
    render(
      <FeedbackComponent
        feedbackList={sampleFeedback}
        openIndex={-1}
        handleToggle={handleToggleMock}
        navigate={navigateMock}
      />
    );

    const button = screen.getByTestId("mock-button");
    fireEvent.click(button);

    expect(navigateMock).toHaveBeenCalledWith("/");
  });
});
