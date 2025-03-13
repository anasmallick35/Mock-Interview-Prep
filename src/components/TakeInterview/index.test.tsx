
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import TakeInterviewComponent from '.';
import useAuth from '@/hooks/useAuth';
import "@testing-library/jest-dom";
import env from '@/utils/config';

jest.mock('sonner');
jest.mock('@/hooks/useAuth', () => ({
    __esModule: true,
    default: jest.fn(),
  }));

jest.mock('../Button', () => ({
  __esModule: true,
  default: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));

jest.mock("@/utils/firebase", () => ({
    auth: {
      currentUser: null,
    },
    signInWithEmailAndPassword: jest.fn(),
    signInWithPopup: jest.fn(),
    signInWithPhoneNumber: jest.fn(),
    GoogleAuthProvider: jest.fn(),
    RecaptchaVerifier: jest.fn(),
  }));

jest.mock('lucide-react', () => ({
  LoaderCircle: () => <div>LoaderCircle</div>,
}));

describe('TakeInterviewComponent', () => {
    const mockHandleStartInterview = jest.fn();
    const mockHandleGenerateQuestions = jest.fn();
    const mockSetJobTitle = jest.fn();
    const mockSetTopic = jest.fn();
    const mockSetOpenDialog = jest.fn();
  
    const defaultProps = {
      openDialog: false,
      handleStartInterview: mockHandleStartInterview,
      handleGenerateQuestions: mockHandleGenerateQuestions,
      setJobTitle: mockSetJobTitle,
      setTopic: mockSetTopic,
      setOpenDialog: mockSetOpenDialog,
      loading: false,
    };

  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  it('renders the component correctly', () => {
    (useAuth as jest.Mock).mockReturnValue({ isGuest: false });

    render(<TakeInterviewComponent {...defaultProps} />);
    expect(screen.getByText('+ Take new Interview')).toBeInTheDocument();
  });


  it('renders the dialog when openDialog is true', () => {
    render(<TakeInterviewComponent {...defaultProps} openDialog={true} />);
    expect(screen.getByText('Tell us about the job role')).toBeInTheDocument();
  });

  it('calls handleGenerateQuestions when the form is submitted', async () => {
    render(<TakeInterviewComponent {...defaultProps} openDialog={true} />);

    fireEvent.change(screen.getByPlaceholderText('Enter Job Title'), {
      target: { value: 'Software Engineer' },
    });
    fireEvent.change(screen.getByPlaceholderText('E.g. React, Angular, Java'), {
      target: { value: 'React, JavaScript' },
    });

    fireEvent.click(screen.getByText('Start Interview'));

    await waitFor(() => {
      expect(mockHandleGenerateQuestions).toHaveBeenCalled();
    });
  });

  it('shows loading state when generating questions', () => {
    render(<TakeInterviewComponent {...defaultProps} openDialog={true} loading={true} />);
    expect(screen.getByText('Generating...')).toBeInTheDocument();
    expect(screen.getByText('LoaderCircle')).toBeInTheDocument();
  });

  it('closes the dialog when the cancel button is clicked', () => {
    render(<TakeInterviewComponent {...defaultProps} openDialog={true} />);
    fireEvent.click(screen.getByText('Cancel'));
    expect(mockSetOpenDialog).toHaveBeenCalledWith(false);
  });

  test("uses environment variables", () => {
    expect(env.VITE_FIREBASE_API_KEY).toBe("mock-api-key");
    expect(env.VITE_FIREBASE_PROJECT_ID).toBe("mock-project-id");
  });
});