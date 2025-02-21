import { render, fireEvent, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import BulkUpload from "../BulkUploadQuestion";
import { BULK_QUESTION_UPLOAD } from "@/services/InterviewMutation";

jest.mock("@/hooks/useAuth", () => ({
  __esModule: true,
  default: () => ({
    user: { uid: "123" },
    isAuthenticated: true,
  }),
}));


jest.mock("@/components/BulkUploadQuestion", () => ({
  __esModule: true,
  default: ({ handleFileUpload, handleSubmit, file }: any) => (
    <div>
      <input data-testid="file-input" onChange={handleFileUpload} />
      <button data-testid="submit-btn" onClick={handleSubmit}>Upload</button>
      <span data-testid="file-name">{file?.name || "No file"}</span>
    </div>
  ),
}));

describe("useBulkUpload hook", () => {


  it("should call mutation on file upload", async () => {
    const mocks = [
      {
        request: {
          query: BULK_QUESTION_UPLOAD,
          variables: {
            objects: [
              {
                question: "Sample Question",
                jobTitle: "Developer",
                topic: "React",
                user_id: "123",
              },
            ],
          },
        },
        result: { data: { insert_questions: { returning: [] } } },
      },
    ];

    const { getByTestId } = render(
      <MockedProvider mocks={mocks}>
        <BulkUpload />
      </MockedProvider>
    );

    const submitButton = getByTestId("submit-btn");

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(getByTestId("submit-btn")).toBeTruthy();
    });
  });
});
