
import { render, screen, fireEvent } from "@testing-library/react";
import QuestionUpload from ".";
import "@testing-library/jest-dom";

const mockHandleStartInterview = jest.fn();
const mockHandleSubmit = jest.fn();
const mockSetIsFormOpen = jest.fn();
const mockSetQuestion = jest.fn();
const mockSetJobTitle = jest.fn();
const mockSetTopic = jest.fn();

const defaultProps = {
    handleUploadQuestion: mockHandleStartInterview,
  handleSubmit: mockHandleSubmit,
  isFormOpen: false,
  setIsFormOpen: mockSetIsFormOpen,
  setQuestion: mockSetQuestion,
  setJobTitle: mockSetJobTitle,
  jobTitle: "",
  topic: "",
  setTopic: mockSetTopic,
  question: "",
};


test("renders upload button when form is closed", () => {
  render(<QuestionUpload {...defaultProps} />);

  const uploadButton = screen.getByText("Upload Question");
  expect(uploadButton).toBeInTheDocument();
  fireEvent.click(uploadButton);
  expect(mockHandleStartInterview).toHaveBeenCalled();
});


test("renders form when isFormOpen is true", () => {
  render(<QuestionUpload {...defaultProps} isFormOpen={true} />);

  expect(screen.getByText("Contribute by Uploading Question")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Question")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Job Title")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Topic")).toBeInTheDocument();
});


test("calls handleSubmit on form submission", () => {
  render(<QuestionUpload {...defaultProps} isFormOpen={true} />);

  fireEvent.submit(screen.getByRole("button", { name: /upload question/i }));
  expect(mockHandleSubmit).toHaveBeenCalled();
});

test("calls setIsFormOpen(false) when closing the form", () => {
  render(<QuestionUpload {...defaultProps} isFormOpen={true} />);

  const closeButton = screen.getByText("Close");
  fireEvent.click(closeButton);

  expect(mockSetIsFormOpen).toHaveBeenCalledWith(false);
});


test("updates state when user types in input fields", () => {
  render(<QuestionUpload {...defaultProps} isFormOpen={true} />);

  const questionInput = screen.getByPlaceholderText("Question");
  fireEvent.change(questionInput, { target: { value: "What is React?" } });
  expect(mockSetQuestion).toHaveBeenCalledWith("What is React?");

  const jobTitleInput = screen.getByPlaceholderText("Job Title");
  fireEvent.change(jobTitleInput, { target: { value: "Frontend Developer" } });
  expect(mockSetJobTitle).toHaveBeenCalledWith("Frontend Developer");

  const topicInput = screen.getByPlaceholderText("Topic");
  fireEvent.change(topicInput, { target: { value: "React" } });
  expect(mockSetTopic).toHaveBeenCalledWith("React");
});

test("does not render form when isFormOpen is false", () => {
  render(<QuestionUpload {...defaultProps} isFormOpen={false} />);

  expect(screen.queryByText("Contribute by Uploading Question")).not.toBeInTheDocument();
  expect(screen.queryByPlaceholderText("Question")).not.toBeInTheDocument();
  expect(screen.queryByPlaceholderText("Job Title")).not.toBeInTheDocument();
  expect(screen.queryByPlaceholderText("Topic")).not.toBeInTheDocument();
});

