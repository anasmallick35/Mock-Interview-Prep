
import { render, screen, fireEvent } from "@testing-library/react";
import UserContribution from "../UserContribution"; 
import "@testing-library/jest-dom";

const mockProps = {
  currentQuestions: [
    {
      id: 1,
      question: "What is React?",
      topic: "Frontend",
      status: "approved",
    },
    {
      id: 2,
      question: "Explain useState hook.",
      topic: "React",
      status: "pending",
    },
  ],
  scrollPagination: jest.fn(),
  visiblePages: [1, 2, 3],
  handleDeleteQuestions: jest.fn(),
  setStatusFilter: jest.fn(),
  setCurrentPage: jest.fn(),
  currentPage: 1,
  statusFilter: "all" as "approved" | "pending" | "all" | "rejected",
  paginationRef: { current: null },
  totalPages: 3,
  totalApprovedQuestion: 5,
  totalPendingQuestion: 3,
  totalRejectedQuestions: 2,
};

describe("UserContribution Component", () => {
  it("renders contribution counts", () => {
    render(<UserContribution totalQuestions={0} {...mockProps} />);
    expect(screen.getByTestId("approved-label")).toHaveTextContent("Approved");
    expect(screen.getByTestId("approved-count")).toHaveTextContent("5");
    expect(screen.getByTestId("pending-label")).toHaveTextContent("Pending");
    expect(screen.getByTestId("pending-count")).toHaveTextContent("3");
    expect(screen.getByTestId("rejected-label")).toHaveTextContent("Rejected");
    expect(screen.getByTestId("rejected-count")).toHaveTextContent("2");
  });

  it("displays question cards", () => {
    render(<UserContribution totalQuestions={0} {...mockProps} />);
    expect(screen.getByText("What is React?")).toBeInTheDocument();
    expect(screen.getByText("Explain useState hook.")).toBeInTheDocument();
  });

  it("shows delete button only for pending/rejected questions", () => {
    render(<UserContribution totalQuestions={0} {...mockProps} />);
    const deleteButtons = screen.getAllByText("Delete");
    expect(deleteButtons.length).toBe(1);
  });

  it("calls handleDeleteQuestions when delete button is clicked", () => {
    render(<UserContribution totalQuestions={0} {...mockProps} />);
    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);
    expect(mockProps.handleDeleteQuestions).toHaveBeenCalledWith(2);
  });

  it("calls setStatusFilter and setCurrentPage on filter change", () => {
    render(<UserContribution totalQuestions={0} {...mockProps} />);
    const select = screen.getByLabelText("Filter by Status:");
    fireEvent.change(select, { target: { value: "approved" } });

    expect(mockProps.setStatusFilter).toHaveBeenCalledWith("approved");
    expect(mockProps.setCurrentPage).toHaveBeenCalledWith(1);
  });

  it("renders 'No questions found' message when no data", () => {
    render(
      <UserContribution
        totalQuestions={0} {...mockProps}
        currentQuestions={[]}      />
    );

    expect(screen.getByText("No questions found.")).toBeInTheDocument();
    expect(
      screen.getByText("Start contributing by adding new questions!")
    ).toBeInTheDocument();
  });
});
