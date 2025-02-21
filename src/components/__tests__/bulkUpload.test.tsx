import {render, screen, fireEvent} from "@testing-library/react";
import BulkUpload from "../BulkUploadQuestion";
import "@testing-library/jest-dom";

describe("BulkUpload Component", ()=>{
    let fileInputRef: React.RefObject<HTMLInputElement>;
    let mockHandleFileUpload:jest.Mock;
    let mockHandleSubmit: jest.Mock;

    beforeEach(() => {
        fileInputRef = {current:null};
        mockHandleFileUpload = jest.fn();
        mockHandleSubmit = jest.fn();

        render(
            <BulkUpload
                fileInputRef={fileInputRef}
                loading = {false}
                handleFileUpload={mockHandleFileUpload}
                handleSubmit={mockHandleSubmit}
                />
        )
    });

    test("renders file input",()=>{
        const fileInput = screen.getByLabelText(/upload file/i);
        expect(fileInput).toBeInTheDocument();
    });

    test("calls handleFileUpload wehn file is selected", ()=>{
        const file = new File(["dummy content"], "test.xlsx", {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        });
        const fileInput = screen.getByLabelText(/upload file/i); 
        fireEvent.change(fileInput,{target:{files:[file]}});

        expect(mockHandleFileUpload).toHaveBeenCalledTimes(1);
    });

    test("disabled upload button when loading is true", () =>{
        render(
            <BulkUpload
            fileInputRef={fileInputRef}
        loading={true}
        handleFileUpload={mockHandleFileUpload}
        handleSubmit={mockHandleSubmit}
      />
        );
        const uploadButtons = screen.getAllByRole("button", { name: /upload excel file/i });
        const disabledButton = uploadButtons.find(button => button.hasAttribute('disabled'));
        expect(disabledButton).toBeDisabled();
    })
})