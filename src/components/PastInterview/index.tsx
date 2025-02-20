import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteInterviewStart, fetchInterviewsStart } from '../../store/slices/PastInterviewSlices/interviewSlices';
import { RootState } from '../../store/store';
import { Spinner } from '../Spinner';
import useAuth from '../../hooks/useAuth'; 

const PrevInterviewCard = React.lazy(() => import('../PrevInterviewCard'));

const PastInterviews = () => {
  const { user } = useAuth(); 
  const dispatch = useDispatch();
  const { interviews, loading, error } = useSelector((state: RootState) => state.interviews);

  useEffect(() => {
    if (user?.uid || user?.sub) { 
      dispatch(fetchInterviewsStart(user.uid || user.sub));
    }
  }, [dispatch, user]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleDeleteInterview = (interviewId: string) => {
    dispatch(deleteInterviewStart(interviewId));
  };

  return (
    <div>
      <br />
      <br />
      {interviews?.length !== 0 && (
        <h2 className="font-medium text-xl">Previous Mock Interview</h2>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
        {interviews &&
          interviews.map((interview, index) => (
            <Suspense key={index} fallback={<Spinner/>}>
              <PrevInterviewCard
                interview={interview}
                onDelete={() => handleDeleteInterview(interview.id)}
              />
            </Suspense>
          ))}
      </div>
    </div>
  );
};

export default PastInterviews;