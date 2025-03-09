
import { render, screen } from "@testing-library/react";
import Home from ".";
import "@testing-library/jest-dom";

// Mock components
jest.mock("@/components/Spinner", () => ({
  Spinner: () => <div data-testid="spinner">Loading...</div>,
}));

jest.mock("@/containers/TakeInterview", () => () => (
  <div data-testid="take-interview">TakeInterviewContainer</div>
));

jest.mock("@/components/Cards/PrevInterviewCard", () => () => (
  <div data-testid="prev-interview">PrevInterviewCard</div>
));

jest.mock("@/components/Cards/ContributionCard", () => () => (
  <div data-testid="contribution-card">ContributionCard</div>
));

describe("Home Component", () => {
  it("renders spinner when firebaseLoading is true", () => {
    render(<Home firebaseLoading={true} firebaseError={null} />);
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("renders error message when firebaseError is present", () => {
    const error = { message: "Something went wrong" };
    render(<Home firebaseLoading={false} firebaseError={error} />);
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
  });

  it("renders dashboard when loading is false and no error", () => {
    render(<Home firebaseLoading={false} firebaseError={null} />);

    // Check dashboard headings
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Create and start your AI Mock Interview/i)
    ).toBeInTheDocument();

    // Check for child components
    expect(screen.getByTestId("take-interview")).toBeInTheDocument();
    expect(screen.getByTestId("prev-interview")).toBeInTheDocument();
    expect(screen.getByTestId("contribution-card")).toBeInTheDocument();
  });
});
