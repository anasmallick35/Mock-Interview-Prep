import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import PastInterviews from ".";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

jest.mock("../PrevInterviewCard", () => ({ interview, onDelete }: any) => (
  <div data-testid="prev-interview-card">
    <p>{interview.jobTitle}</p> 
    <button onClick={onDelete}>Delete</button>
  </div>
));

const mockHandleDeleteInterview = jest.fn();


const mockInterviews = [
  { id: "1", jobTitle: "Frontend Developer" },
  { id: "2", jobTitle: "Backend Developer" },
];

const renderComponent = (props: Partial<React.ComponentProps<typeof PastInterviews>> = {}) => {
  return render(
    <BrowserRouter>
      <PastInterviews
        interviews={props.interviews || []}
        loading={props.loading || false}
        error={props.error || null}
        handleDeleteInterview={props.handleDeleteInterview || mockHandleDeleteInterview}
      />
    </BrowserRouter>
  );
};

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

describe("PastInterviews Component", () => {
  test("renders error message when error occurs", () => {
    renderComponent({ error: "Network error" });
    expect(screen.getByText("Error: Network error")).toBeInTheDocument();
  });

  test("renders empty state when no interviews are available", () => {
    renderComponent({ interviews: [] });
    expect(screen.queryByText("Previous Mock Interviews")).toBeNull();
  });

  test("renders list of past interviews", async () => {
    renderComponent({ interviews: mockInterviews });

    expect(screen.getByText("Previous Mock Interviews")).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText("Frontend Developer")).toBeInTheDocument();
      expect(screen.getByText("Backend Developer")).toBeInTheDocument();
    });
  });

  test("calls handleDeleteInterview when delete button is clicked", async () => {
    renderComponent({ interviews: mockInterviews });

    const deleteButtons = screen.getAllByText("Delete");
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(mockHandleDeleteInterview).toHaveBeenCalledTimes(1);
      expect(mockHandleDeleteInterview).toHaveBeenCalledWith("1");
    });
  });
});