import React, { useRef, useState } from "react";
import * as XLSX from "xlsx";
import { useMutation } from "@apollo/client";
import Button from "../Button";
import { BULK_QUESTION_UPLOAD } from "../../services/InterviewMutation";
import { toast } from "sonner";
import useAuth from '../../hooks/useAuth'; 
const BulkUpload = () => {
  const { user, isAuthenticated } = useAuth(); 
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);

  const [uploadQuestion] = useMutation(BULK_QUESTION_UPLOAD);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!isAuthenticated) {
      toast.success("Please Login to continue");
      return;
    }
    if (!file || !user?.uid) return alert("Please select a file and login"); 
    setLoading(true);
    const reader = new FileReader();
    reader.onload = async (event) => {
      const data = event.target?.result;
      if (!data) return;

      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      const questions = jsonData.map((row: any) => ({
        question: row.Question,
        jobTitle: row["Job Title"],
        topic: row.Topic,
        user_id: user.uid, 
      }));
      try {
        await uploadQuestion({
          variables: {
            objects: questions,
          },
        });
        toast.success("Questions uploaded successfully");
        setFile(null);

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } catch (error) {
        console.error("Error uploading questions:", error);
        toast.error("error in uploading questions");
        setLoading(false);
      }
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div>
      <input
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