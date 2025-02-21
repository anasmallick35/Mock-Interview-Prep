import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteInterviewStart,
  fetchInterviewsStart,
} from "@/store/slices/PastInterviewSlices/interviewSlices";
import { RootState } from "@/store/store";
import useAuth from "@/hooks/useAuth";
import PastInterviews from "@/components/PastInterview";

const usePastInterviews = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { interviews, loading, error } = useSelector(
    (state: RootState) => state.interviews
  );

  useEffect(() => {
    if (user?.uid || user?.sub) {
      dispatch(fetchInterviewsStart(user.uid || user.sub));
    }
  }, [dispatch, user]);

  const handleDeleteInterview = useCallback(
    (interviewId: string) => {
      dispatch(deleteInterviewStart(interviewId));
    },
    [dispatch]
  );

  return (
    <PastInterviews
      interviews={interviews}
      loading={loading}
      error={error}
      handleDeleteInterview={handleDeleteInterview}
    />
  );
};

export default usePastInterviews;
