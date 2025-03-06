import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PrevInterviewCard from ".";
import { useNavigate } from "react-router-dom";
import "@testing-library/jest-dom";


jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("PrevInterviewCard Component", () => {
  const mockNavigate = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  const mockInterview = {
    id: "1",
    jobTitle: "Software Engineer",
    topic: "Data Structures & Algorithms",
    created_at: "2024-02-21T12:00:00Z",
    jsonMockResp: "{}",
  };

  test("renders interview details correctly", () => {
    render(
      <MemoryRouter>
        <PrevInterviewCard interview={mockInterview} onDelete={mockOnDelete} />
      </MemoryRouter>
    );

    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    expect(screen.getByText("Data Structures & Algorithms")).toBeInTheDocument();
    expect(screen.getByText(/Created At:/)).toBeInTheDocument();
  });

  test("navigates to the correct start interview URL when 'Start' button is clicked", () => {
    render(
      <MemoryRouter>
        <PrevInterviewCard interview={mockInterview} onDelete={mockOnDelete} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Start"));
    expect(mockNavigate).toHaveBeenCalledWith("/start-interview/1");
  });

  test("navigates to the correct feedback URL when 'Feedback' button is clicked", () => {
    render(
      <MemoryRouter>
        <PrevInterviewCard interview={mockInterview} onDelete={mockOnDelete} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Feedback"));
    expect(mockNavigate).toHaveBeenCalledWith("/start-interview/1/feedback");
  });
});
