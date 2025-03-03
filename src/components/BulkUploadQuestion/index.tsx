import React from "react";
import Button from "../Button"; // Ensure this path is correct

interface BulkUploadProps {
  fileInputRef: React.RefObject<HTMLInputElement>;
  loading: boolean;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
}

const BulkUpload: React.FC<BulkUploadProps> = ({
  fileInputRef,
  loading,
  handleFileUpload,
  handleSubmit,
}) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Bulk Upload Questions
      </h2>
      <p className="text-gray-600 mb-6">
        Upload an Excel file (.xlsx) to add questions in bulk.
      </p>

      {/* File Upload Input */}
      <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-blue-500 transition duration-300">
        <input
          id="file-upload"
          type="file"
          accept=".xlsx"
          onChange={handleFileUpload}
          ref={fileInputRef}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            />
          </svg>
          <p className="mt-2 text-sm text-gray-600">
            <span className="font-semibold text-blue-500">Click to upload</span> or
            drag and drop
          </p>
          <p className="text-xs text-gray-500">Excel files only (.xlsx)</p>
        </div>
      </div>

      {/* Upload Button */}
      <Button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full mt-6 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        {loading ? "Uploading..." : "Upload Excel File"}
      </Button>
    </div>
  );
};

export default BulkUpload;