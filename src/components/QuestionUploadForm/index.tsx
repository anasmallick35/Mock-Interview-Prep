import { FaCloudUploadAlt } from "react-icons/fa";
import Button from "../Button";

interface UploadQuestionProps {
  handleStartInterview: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  isFormOpen: boolean;
  setIsFormOpen: (isOpen: boolean) => void;
  setQuestion: (value: string) => void;
  setJobTitle: (value: string) => void;
  jobTitle: string;
  topic: string;
  setTopic: (value: string) => void;
  question: string;
}

const QuestionUpload: React.FC<UploadQuestionProps> = ({
  handleStartInterview,
  handleSubmit,
  isFormOpen,
  setIsFormOpen,
  setQuestion,
  setJobTitle,
  jobTitle,
  topic,
  setTopic,
  question,
}) => {
  return (
    <>
      {!isFormOpen && (
        <Button
          onClick={handleStartInterview}
          className="flex items-center space-x-2 p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        >
          <FaCloudUploadAlt className="cursor-pointer" />
          <span>Upload Question</span>
        </Button>
      )}

      {isFormOpen && (
        <div className="fixed inset-0 bg-white z-50 p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <div className="border-b pb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                Contribute by Uploading Question
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Make sure to upload correct questions to get approved.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <textarea
                placeholder="Question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={6}
                required
              />
              <input
                type="text"
                placeholder="Job Title"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                placeholder="Topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <Button
                type="submit"
                className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Upload Question
              </Button>
            </form>

            <Button
              onClick={() => setIsFormOpen(false)}
              className="mt-4 text-gray-500 bg-red-500 hover:text-gray-700 flex items-center space-x-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <span>Close</span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
export default QuestionUpload;
