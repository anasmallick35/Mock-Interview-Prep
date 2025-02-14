import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadQuestionStart } from '@/store/slices/QuestionUploadSlice';
import { RootState } from '@/store/store';
import { useNavigate } from 'react-router-dom';
import { Upload } from 'lucide-react';
import Button from '../Button/Button';

const UploadQuestion = () => {
  const { user,isAuthenticated } = useAuth0();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.uploadQuestion);
  const [question, setQuestion] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [topic, setTopic] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false); 

  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !error) {
      navigate('/');
    }
  }, [loading, error, navigate]);

  const userId = user?.sub || '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(uploadQuestionStart({ question, jobTitle, topic, userId }));

    alert('Questions submitted successfully');
    setQuestion('');
    setJobTitle('');
    setTopic('');
    setIsFormOpen(false); 
  };

  const handleStartInterview = () => {
    if (!isAuthenticated) {
      alert('Please login to start an interview.');
      return;
    }
    setIsFormOpen(true);
  };

  return (
    <>
      
      {!isFormOpen && (
        <Button
          onClick={handleStartInterview}
          className="flex items-center space-x-2 p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        >
          <Upload className="w-5 h-5" />
          <span>Upload Question</span>
        </Button>
      )}

     
      {isFormOpen && (
        <div className="fixed inset-0 bg-white z-50 p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
         
            <div className="border-b pb-4">
              <h2 className="text-2xl font-bold text-gray-800">Contribute by Uploading Question</h2>
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
              className="mt-4 text-gray-500  bg-red-500 hover:text-gray-700 flex items-center space-x-2"
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


export default UploadQuestion;