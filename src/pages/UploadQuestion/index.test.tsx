import { render, screen, fireEvent } from "@testing-library/react";
import UploadQuestionPage from ".";
import "@testing-library/jest-dom";

jest.mock("@/containers/QuestionUploadForm", () => () => (
  <div data-testid="upload-question-form">UploadQuestionForm</div>
));
jest.mock("@/containers/BulkUploadQuestion", () => () => (
  <div data-testid="bulk-upload">BulkUploadComponent</div>
));

describe("UploadQuestionPage", () => {
  it("renders page heading", () => {
    render(<UploadQuestionPage />);
    expect(screen.getByText("Upload Questions")).toBeInTheDocument();
  });

  it("renders UploadQuestionContainer and BulkUpload components", () => {
    render(<UploadQuestionPage />);
    expect(screen.getByTestId("upload-question-form")).toBeInTheDocument();
    expect(screen.getByTestId("bulk-upload")).toBeInTheDocument();
  });

  it("handles clicking UploadQuestionContainer", () => {
    render(<UploadQuestionPage />);
    const formElement = screen.getByTestId("upload-question-form");
    fireEvent.click(formElement);
    expect(screen.getByTestId("upload-question-form")).toBeInTheDocument();
  });

  it("handles clicking BulkUpload", () => {
    render(<UploadQuestionPage />);
    const bulkUploadElement = screen.getByTestId("bulk-upload");
    fireEvent.click(bulkUploadElement);

    expect(screen.getByTestId("bulk-upload")).toBeInTheDocument();
  });
});
