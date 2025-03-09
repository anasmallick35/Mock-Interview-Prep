import { render, screen, fireEvent } from "@testing-library/react";
import ProfileComponent from ".";
import { ProfileProps } from "./types";
import '@testing-library/jest-dom';

// Mock Button and Spinner
jest.mock("@/components/Button", () => (props: any) => (
  <button onClick={props.onClick} disabled={props.disabled} className={props.className}>
    {props.children}
  </button>
));

jest.mock("@/components/Spinner", () => ({
  Spinner: () => <div data-testid="spinner">Loading...</div>,
}));

const mockProps: ProfileProps = {
  user: { email: "test@example.com" },
  name: "John Doe",
  setName: jest.fn(),
  picture: "https://example.com/profile.jpg",
  setImageFile: jest.fn(),
  uploading: false,
  updateLoading: false,
  updateError: "",
  handleSubmit: jest.fn((e) => e.preventDefault()),
  loading: false,
  error: "",
};

describe("ProfileComponent", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading spinner when loading is true", () => {
    render(<ProfileComponent {...mockProps} loading={true} />);
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("renders error message when error is present", () => {
    render(<ProfileComponent {...mockProps} error="Failed to fetch" />);
    expect(screen.getByText(/Error fetching user data/i)).toBeInTheDocument();
  });

  it("renders profile details and form", () => {
    render(<ProfileComponent {...mockProps} />);

    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Profile Picture/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Update Profile/i })).toBeInTheDocument();
  });

  it("calls setName when input changes", () => {
    render(<ProfileComponent {...mockProps} />);
    const nameInput = screen.getByLabelText(/Name/i);
    fireEvent.change(nameInput, { target: { value: "New Name" } });

    expect(mockProps.setName).toHaveBeenCalledWith("New Name");
  });


  it("disables the button when uploading or updating", () => {
    render(<ProfileComponent {...mockProps} uploading={true} />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("shows uploading text when uploading is true", () => {
    render(<ProfileComponent {...mockProps} uploading={true} />);
    expect(screen.getByText(/Uploading.../i)).toBeInTheDocument();
  });


  it("displays error message if updateError is present", () => {
    render(<ProfileComponent {...mockProps} updateError="Update failed" />);
    expect(screen.getByText(/Error updating profile/i)).toBeInTheDocument();
  });
});
