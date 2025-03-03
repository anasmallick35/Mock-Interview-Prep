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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      {/* Header Section */}
      <div className="w-full max-w-4xl text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          Interview Playground
        </h1>
        <p className="text-lg text-gray-600">
          Practice and ace your interviews with tailored questions and real-time feedback.
        </p>
        <div className="w-20 h-1 bg-blue-500 mx-auto mt-4 rounded-full" />
      </div>

      {/* Create Interview Button */}
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8">
        <div
          className="p-6 border-2 border-dashed border-blue-200 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 text-center hover:scale-105 shadow-md cursor-pointer transition-all duration-300"
          onClick={isGuest ? handleGuestRestriction : handleStartInterview}
        >
          <h2 className="font-bold text-2xl text-blue-800 mb-2">
            + Create New Interview
          </h2>
          <p className="text-gray-600">
            Click here to start a new interview session.
          </p>
        </div>
      </div>

      {/* Dialog for Job Details */}
      {openDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg relative">
            <h1 className="text-3xl font-bold text-center mb-3 text-gray-800">
              Tell Us About the Job Role
            </h1>
            <p className="text-center text-gray-600 mb-6">
              Add details about the job position, role, description, and experience.
            </p>

            <form onSubmit={handleGenerateQuestions} className="space-y-5">
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
                  className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center space-x-2"
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
    </div>
  );
};

export default TakeInterviewComponent;