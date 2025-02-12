'use client'
import  { useEffect, useState } from 'react';
import { ChevronsUpDown } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { GET_FEEDBACK_FROM_USER_ANSWERS } from '@/services/InterviewQuery';
import { DELETE_FEEDBACK } from '@/services/InterviewMutation';


const Feedback = () => {
    const { interviewId } = useParams<{ interviewId: string }>();
    const [feedbackList, setFeedbackList] = useState<any[]>([]);
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const navigate = useNavigate();
    const { data } = useQuery(GET_FEEDBACK_FROM_USER_ANSWERS, {
        variables: { interviewId },
    });

    useEffect(() => {
        if (data && data.userAnswer) {
            setFeedbackList(data.userAnswer);
        }
    }, [data]);

    const [deleteFeedback] = useMutation(DELETE_FEEDBACK, {
        variables: { mockId: interviewId },
        onCompleted: () => {
            alert('Feedback Deleted successfully');
            setFeedbackList([]);
        }
    });

    const handleDelete = () => {
        deleteFeedback();
    };

    return (
        <div className='p-10 ml-6'>
            <button className="mt-5 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition" onClick={handleDelete}>
                Delete
            </button>

            <h2 className="text-3xl font-bold text-green-600 mt-4">Congratulations!</h2>
            <h2 className="font-bold text-2xl">Here is your interview feedback</h2>

            {feedbackList.length === 0 ? (
                <h2 className="font-bold text-lg text-green-500">No interview Feedback</h2>
            ) : (
                <>
                    <h2 className="text-primary text-lg my-2">
                        Your overall interview rating: <strong>7/10</strong>
                    </h2>
                    <p className="text-sm text-gray-500">
                        Below are interview questions with correct answers, your answers, and feedback for improvement.
                    </p>

                    {feedbackList.map((item, index) => (
                        <div key={index} className="mt-4 border rounded-lg overflow-hidden">
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full p-3 flex justify-between items-center bg-gray-100 hover:bg-gray-200 transition"
                            >
                                {item.question}
                                <ChevronsUpDown className="h-4" />
                            </button>

                            {openIndex === index && (
                                <div className="p-4 space-y-2 bg-white border-t">
                                    <p className="text-red-500 p-2 border rounded-lg">
                                        <strong>Rating:</strong> {item.rating}
                                    </p>
                                    <p className="p-2 border rounded-lg bg-red-50 text-sm text-red-900">
                                        <strong>Your Answer:</strong> {item.userAnswer}
                                    </p>
                                    <p className="p-2 border rounded-lg bg-green-50 text-sm text-green-900">
                                        <strong>Correct Answer:</strong> {item.correctAnswer}
                                    </p>
                                    <p className="p-2 border rounded-lg bg-blue-50 text-sm text-blue-900">
                                        <strong>Feedback:</strong> {item.feedback}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </>
            )}

            <button className="mt-5 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition" onClick={() => navigate('/')}>
                Go Home
            </button>
        </div>
    );
};

export default Feedback;
