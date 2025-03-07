import React, { useState, useRef } from "react";
import UploadQuestionContainer from "@/containers/QuestionUploadForm";
import BulkUpload from "@/containers/BulkUploadQuestion";

const UploadQuestionPage: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<"form" | "bulk" | null>(
    null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadQuestion = () => {
    setIsFormOpen(true);
    setSelectedOption("form");
  };

  const handleBulkUpload = () => {
    setSelectedOption("bulk");
  };


  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Upload Questions
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Option 1: Upload via Form */}
          <div onClick={handleUploadQuestion} className="cursor-pointer">
            <UploadQuestionContainer
            />
          </div>

          {/* Option 2: Bulk Upload */}
          <div onClick={handleBulkUpload} className="cursor-pointer">
            <BulkUpload
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadQuestionPage;