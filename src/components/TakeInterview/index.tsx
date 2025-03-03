import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import useAuth from "@/hooks/useAuth";
import React from "react";
import Button from "../Button";
import { TakeInterviewProps } from "./types";

const TakeInterviewComponent: React.FC<TakeInterviewProps> = ({
  openDialog,
  handleStartInterview,
  handleGenerateQuestions,
  setJobTitle,
  setTopic,
  setOpenDialog,
  loading,
}) => {
  const { isGuest } = useAuth();

  const handleGuestRestriction = () => {
    toast.error("Please login or signup to start an interview.");
  };

  return (
    <>
      <div
        className="p-6 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={isGuest ? handleGuestRestriction : handleStartInterview}
      >
        <h2 className="font-bold text-lg text-center">+ Take new Interview</h2>
      </div>

      {openDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg mx-4">
            <h1 className="text-2xl font-bold text-center mb-2">
              Tell us about the job role
            </h1>
            <p className="text-center text-gray-600 mb-6">
              Add details about your job position, job role, description, and
              years of experience.
            </p>

            <form onSubmit={handleGenerateQuestions} className="space-y-4">
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Job Title
                </label>
                <input
                  type="text"
                  placeholder="Enter Job Title"
                  onChange={(e) => setJobTitle(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Job Responsibilities
                </label>
                <textarea
                  placeholder="E.g. React, Angular, Java"
                  required
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 h-28 resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  onClick={() => setOpenDialog(false)}
                  className="px-4 py-2 border rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center space-x-2"
                >
                  {loading ? (
                    <>
                      <LoaderCircle className="animate-spin w-5 h-5" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    "Start Interview"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default TakeInterviewComponent;