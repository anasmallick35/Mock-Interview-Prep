import { toast } from "sonner";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PastInterviews from "@/components/PastInterview";
import {
  deleteInterviewStart,
  fetchInterviewsStart,
} from "@/redux/slices/PastInterviewSlices";
import { RootState } from "@/redux/store";
import useAuth from "@/hooks/useAuth";

const usePastInterviews = () => {
  const { user, isGuest } = useAuth();
  const dispatch = useDispatch();
  const { interviews, loading, error } = useSelector(
    (state: RootState) => state.interviews
  );

  const guestId = import.meta.env.VITE_GUEST_ID;

  const userId = user?.sub || user?.uid || guestId;

  useEffect(() => {
    if (userId) {
      dispatch(fetchInterviewsStart(userId));
    }
  }, [dispatch, userId]);

  const handleDeleteInterview = (interviewId: string) => {
    if (isGuest) {
      toast.error("Please Login to access all features");
      return;
    }
    dispatch(deleteInterviewStart(interviewId));

    toast.success("Interview Deleted Successfully");
  };

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
