import { useRef, useState } from "react";
import * as XLSX from "xlsx";
import { toast } from "sonner";
import useAuth from "@/hooks/useAuth";
import { useMutation } from "@apollo/client";
import { BULK_QUESTION_UPLOAD } from "@/services/InterviewMutation";
import BulkUpload from "@/components/BulkUploadQuestion";

const useBulkUpload = () => {
  const { user, isGuest } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);

  const [uploadQuestion] = useMutation(BULK_QUESTION_UPLOAD);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isGuest) {
      toast.error("Please Login to continue");
      return;
    }
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (isGuest) return toast.error("Please Login to continue");

    const userId = user?.uid || user?.sub;
    if (!file || !userId) return toast.error("Please select a file");
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
        user_id: userId,
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
    <BulkUpload
      fileInputRef={fileInputRef}
      loading={loading}
      handleFileUpload={handleFileUpload}
      handleSubmit={handleSubmit}
    />
  );
};

export default useBulkUpload;
