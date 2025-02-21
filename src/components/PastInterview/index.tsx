import { lazy, Suspense } from "react";
import { Spinner } from "../Spinner";

const PrevInterviewCard = lazy(() => import("../PrevInterviewCard"));

interface PastInterviewsProps {
  interviews: any[];
  loading: boolean;
  error: string | null;
  handleDeleteInterview: (id: string) => void;
}

const PastInterviews: React.FC<PastInterviewsProps> = ({
  interviews,
  loading,
  error,
  handleDeleteInterview,
}) => {
  if (loading) return <Spinner />;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div>
      <br />
      <br />
      {interviews?.length > 0 && (
        <h2 className="font-medium text-xl">Previous Mock Interviews</h2>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
        <Suspense fallback={<Spinner />}>
          {interviews?.map((interview) => (
            <PrevInterviewCard
              key={interview.id}
              interview={interview}
              onDelete={() => handleDeleteInterview(interview.id)}
            />
          ))}
        </Suspense>
      </div>
    </div>
  );
};

export default PastInterviews;
