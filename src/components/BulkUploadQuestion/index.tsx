import React from "react";
import Button from "../Button";

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
    <div>
      <label htmlFor="file-upload">Upload File</label>
      <input
        id="file-upload"
        type="file"
        accept=".xlsx"
        onChange={handleFileUpload}
        ref={fileInputRef}
      />
      <Button
        onClick={handleSubmit}
        disabled={loading}
        className="rounded mt-3"
      >
        Upload Excel File
      </Button>
      <br />
      <br />
      <p>Upload questions in bulk</p>
    </div>
  );
};

export default BulkUpload;
