import { render, screen, fireEvent } from "@testing-library/react";
import BulkUpload from ".";
import { createRef } from "react";
import "@testing-library/jest-dom";

describe("BulkUpload Component", () => {
  let fileInputRef: React.RefObject<HTMLInputElement>;
  let handleFileUpload: jest.Mock;
  let handleSubmit: jest.Mock;
  let handleDownloadTemplate: jest.Mock;

  beforeEach(() => {
    fileInputRef = createRef<HTMLInputElement>();
    handleFileUpload = jest.fn();
    handleSubmit = jest.fn();
    handleDownloadTemplate = jest.fn();
  });

  test("renders Bulk Upload component correctly", () => {
    render(
      <BulkUpload
        fileInputRef={fileInputRef}
        loading={false}
        handleFileUpload={handleFileUpload}
        handleSubmit={handleSubmit}
        handleDownloadTemplate={handleDownloadTemplate}
      />
    );

    expect(screen.getByText(/Bulk Upload Questions/i)).toBeInTheDocument();
    expect(screen.getByText(/Upload an Excel file/i)).toBeInTheDocument();
  });

  test("renders file input field", () => {
    render(
      <BulkUpload
        fileInputRef={fileInputRef}
        loading={false}
        handleFileUpload={handleFileUpload}
        handleSubmit={handleSubmit}
        handleDownloadTemplate={handleDownloadTemplate}
      />
    );

    const fileInput = screen.getByTestId("file-upload") as HTMLInputElement;
    expect(fileInput).toBeInTheDocument();
  });

  test("calls handleFileUpload when file is selected", () => {
    render(
      <BulkUpload
        fileInputRef={fileInputRef}
        loading={false}
        handleFileUpload={handleFileUpload}
        handleSubmit={handleSubmit}
        handleDownloadTemplate={handleDownloadTemplate}
      />
    );

    const fileInput = screen.getByTestId("file-upload") as HTMLInputElement;
    const file = new File(["test content"], "test.xlsx", { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(handleFileUpload).toHaveBeenCalled();
  });

  test("calls handleSubmit when Upload Excel File button is clicked", () => {
    render(
      <BulkUpload
        fileInputRef={fileInputRef}
        loading={false}
        handleFileUpload={handleFileUpload}
        handleSubmit={handleSubmit}
        handleDownloadTemplate={handleDownloadTemplate}
      />
    );

    const uploadButton = screen.getByText(/Upload Excel File/i) as HTMLButtonElement;
    fireEvent.click(uploadButton);

    expect(handleSubmit).toHaveBeenCalled();
  });

  test("calls handleDownloadTemplate when Download Excel Template button is clicked", () => {
    render(
      <BulkUpload
        fileInputRef={fileInputRef}
        loading={false}
        handleFileUpload={handleFileUpload}
        handleSubmit={handleSubmit}
        handleDownloadTemplate={handleDownloadTemplate}
      />
    );

    const downloadButton = screen.getByText(/Download Excel Template/i) as HTMLButtonElement;
    fireEvent.click(downloadButton);

    expect(handleDownloadTemplate).toHaveBeenCalled();
  });

  test("disables Upload Excel File button when loading", () => {
    render(
      <BulkUpload
        fileInputRef={fileInputRef}
        loading={true}
        handleFileUpload={handleFileUpload}
        handleSubmit={handleSubmit}
        handleDownloadTemplate={handleDownloadTemplate}
      />
    );

    const uploadButton = screen.getByText(/Uploading.../i) as HTMLButtonElement;
    expect(uploadButton).toBeDisabled();
  });
});
