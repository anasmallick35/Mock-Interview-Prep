export interface UserContriProps {
    currentQuestions: any
    scrollPagination: (direction: "left" | "right") => void;
    visiblePages: number[];
    handleDeleteQuestions: (questionId: string) => void;
    setStatusFilter: (status: "all" | "approved" | "rejected" | "pending") => void;
    setCurrentPage: (page: number | ((prev: number) => number)) => void;
    currentPage: number;
    statusFilter: "all" | "approved" | "rejected" | "pending";
    paginationRef: React.RefObject<HTMLDivElement>;
    totalPages: number;
    totalPendingQuestion: number;
    totalQuestions: number;
    totalRejectedQuestions: number;
    totalApprovedQuestion: number;
  }