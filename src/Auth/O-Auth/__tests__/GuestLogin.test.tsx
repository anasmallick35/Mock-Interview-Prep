import { render, screen, fireEvent } from '@testing-library/react';
import GuestLogin from '@/Auth/O-Auth/GuestLogin';
import { useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import { toast } from 'sonner';
import "@testing-library/jest-dom";

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('@/hooks/useAuth', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
  },
}));

describe('GuestLogin Component', () => {
  const mockNavigate = jest.fn();
  const mockSetIsGuest = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useAuth as jest.Mock).mockReturnValue({
      setIsGuest: mockSetIsGuest,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the guest login component', () => {
    render(<GuestLogin />);
    expect(screen.getByText('Guest Login')).toBeInTheDocument();
  });

  it('should handle guest login and navigate to home', () => {
    render(<GuestLogin />);
    fireEvent.click(screen.getByText('Continue as Guest'));
    expect(mockSetIsGuest).toHaveBeenCalledWith(true);
    expect(toast.success).toHaveBeenCalledWith('Logged in as Guest');
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});