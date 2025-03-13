import { FaCloudUploadAlt } from "react-icons/fa";
import Button from "../Button";

interface UploadQuestionProps {
  handleUploadQuestion: () => void;
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
  handleUploadQuestion,
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
        <div
          onClick={handleUploadQuestion}
          className="flex justify-center items-center min-h-[200px] bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300 w-full max-w-sm border-2 border-dashed border-gray-300 hover:border-purple-500"
        >
          <div className="flex flex-col items-center space-y-2 p-6 text-gray-800">
            <FaCloudUploadAlt className="text-4xl text-purple-500" />
            <span className="text-xl font-semibold">Upload Question</span>
            <p className="text-sm text-gray-600">Fill the form to contribute</p>
          </div>
        </div>
      )}

      
      {isFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                rows={6}
                required
              />
              <input
                type="text"
                placeholder="Job Title"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <input
                type="text"
                placeholder="Topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />

              <Button
                type="submit"
                className="w-full  bg-purple-600 text-white rounded hover:bg-purple-700 transition duration-300"
              >
                Upload Question
              </Button>
            </form>

            <Button
              onClick={() => setIsFormOpen(false)}
              className="mt-4 text-gray-500 bg-gray-100 hover:bg-gray-200 transition duration-300 flex items-center justify-center space-x-2 p-3 rounded-lg w-full"
            >
              <span>Close</span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default QuestionUpload;