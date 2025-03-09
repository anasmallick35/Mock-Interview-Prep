
import { render, screen, fireEvent } from "@testing-library/react";
import AdminDashboard from ".";
import { AdminDashboardProps } from "./types";
import "@testing-library/jest-dom";


jest.mock('@/components/Button', () => (props: any) => (
  <button {...props}>{props.children}</button>
));

jest.mock('@/components/Spinner', () => ({
  Spinner: () => <div data-testid="spinner">Loading...</div>,
}));

describe("AdminDashboard Component", () => {
  const mockApprove = jest.fn();
  const mockReject = jest.fn();

  const sampleData = {
    questions: [
      {
        id: "q1",
        question: "What is React?",
        topic: "React",
      },
      {
        id: "q2",
        question: "Explain closures in JavaScript.",
        topic: "JavaScript",
      },
    ],
  };

  const baseProps: AdminDashboardProps = {
    queryLoading: false,
    error: undefined,
    data: sampleData,
    approveQuestion: mockApprove,
    rejectQuestion: mockReject,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state", () => {
    render(<AdminDashboard {...baseProps} queryLoading={true} />);
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("renders error message", () => {
    const error = new Error("Failed to fetch");
    render(<AdminDashboard {...baseProps} error={error} />);
    expect(screen.getByText(/Error fetching questions/i)).toBeInTheDocument();
    expect(screen.getByText(/Failed to fetch/i)).toBeInTheDocument();
  });

  it("renders no questions message", () => {
    render(
      <AdminDashboard
        {...baseProps}
        data={{ questions: [] }}
      />
    );
    expect(screen.getByText(/No pending questions found/i)).toBeInTheDocument();
  });

  it("renders questions correctly", () => {
    render(<AdminDashboard {...baseProps} />);
    expect(screen.getByText(/Admin Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText("What is React?")).toBeInTheDocument();
    expect(screen.getByText("Explain closures in JavaScript.")).toBeInTheDocument();
    expect(screen.getAllByText("Approve").length).toBe(2);
    expect(screen.getAllByText("Reject").length).toBe(2);
  });

  it("calls approveQuestion when Approve button is clicked", () => {
    render(<AdminDashboard {...baseProps} />);
    const approveButtons = screen.getAllByText("Approve");
    fireEvent.click(approveButtons[0]);
    expect(mockApprove).toHaveBeenCalledWith("q1");
  });

  it("calls rejectQuestion when Reject button is clicked", () => {
    render(<AdminDashboard {...baseProps} />);
    const rejectButtons = screen.getAllByText("Reject");
    fireEvent.click(rejectButtons[1]);
    expect(mockReject).toHaveBeenCalledWith("q2");
  });
});
