import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import PrevInterviewCard from './PrevInterviewCard';
import { useDispatch, useSelector } from 'react-redux';
import { deleteInterviewStart, fetchInterviewsStart } from '../store/slices/interviewSlices';
import { RootState } from '../store/store';



const PastInterviews = () => {
  const { user } = useAuth0();
  const dispatch = useDispatch();
  const { interviews,loading,error } = useSelector((state: RootState) => state.interviews);

  useEffect(() => {
    if(user?.sub){
      dispatch(fetchInterviewsStart(user.sub));
    }
    
  }, [dispatch, user?.sub]);


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
            <PrevInterviewCard
              interview={interview}
              key={index}
              onDelete={() => handleDeleteInterview(interview.id)} 
            />
          ))}
      </div>
    </div>
  );
};

export default PastInterviews;
