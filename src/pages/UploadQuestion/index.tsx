
import UploadQuestionContainer from "@/containers/QuestionUploadForm";
import BulkUpload from "@/containers/BulkUploadQuestion";

const UploadPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
       
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">
          Upload Questions
        </h1>

       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         
         <div className="bg-white rounded-xl shadow-2xl p-6 hover:shadow-3xl transition-shadow duration-300">
            <UploadQuestionContainer />
          </div>

          {/* Bulk Upload Component */}
          <div className="bg-white rounded-xl shadow-2xl p-6 hover:shadow-3xl transition-shadow duration-300">
            <BulkUpload />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;