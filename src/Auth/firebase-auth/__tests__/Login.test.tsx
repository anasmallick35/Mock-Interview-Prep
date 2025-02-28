import { render, screen, fireEvent } from '@testing-library/react';
import FirebaseLogin from '@/Auth/firebase-auth/Login';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { toast } from 'sonner';
import "@testing-library/jest-dom";

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn(),
  signInWithPopup: jest.fn(),
}));

jest.mock('sonner', () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe('FirebaseLogin Component', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the Firebase login component', () => {
    render(<FirebaseLogin />);
    expect(screen.getByText('CrackTogether')).toBeInTheDocument();
  });

  it('should handle email/password login', async () => {
    (signInWithEmailAndPassword as jest.Mock).mockResolvedValue({});
    render(<FirebaseLogin />);
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });
    fireEvent.click(screen.getByText('Login'));
    await expect(signInWithEmailAndPassword).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('should handle Google login', async () => {
    (signInWithPopup as jest.Mock).mockResolvedValue({});
    render(<FirebaseLogin />);
    fireEvent.click(screen.getByText('Login with Google'));
    await expect(signInWithPopup).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});