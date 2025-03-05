import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import FirebaseSignup from '../Signup';
import { createUserWithEmailAndPassword } from "@/utils/firebase";
import { useLazyQuery, useMutation } from '@apollo/client';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import "@testing-library/jest-dom";

jest.mock('@/utils/firebase', () => ({
  auth: {},
  createUserWithEmailAndPassword: jest.fn(),
}));

jest.mock("@/utils/apolloClient", () => {
  const mockClient = {
    query: jest.fn(),
  };
  return {
    __esModule: true,
    default: mockClient,
  };
});

jest.mock('@apollo/client', () => ({
  useMutation: jest.fn(),
  useLazyQuery: jest.fn(),
  gql: jest.fn(),
}));

jest.mock('react-firebase-hooks/auth', () => ({
  useAuthState: jest.fn(),
}));

jest.mock('sonner', () => ({
  toast: {
    info: jest.fn(),
    error: jest.fn(),
    success: jest.fn(),
  },
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  Link: jest.fn(({ to, children }) => <a href={to}>{children}</a>),
}));

describe('FirebaseSignup', () => {
  const mockCreateUser = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useMutation as jest.Mock).mockReturnValue([mockCreateUser, { loading: false, error: null }]);
    (useAuthState as jest.Mock).mockReturnValue([null, false, null]);
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useLazyQuery as jest.Mock).mockReturnValue([
      jest.fn().mockResolvedValue({ data: { users: [] } }),
      { loading: false, error: null }
    ]);
  });

  test('renders the component correctly', () => {
    render(<FirebaseSignup />);
    expect(screen.getByText(/Sign up with Google/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign up with GitHub/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByText('Sign up')).toBeInTheDocument();
  });

  test('handles form submission with valid credentials', async () => {
    (createUserWithEmailAndPassword as jest.Mock).mockResolvedValueOnce({
      user: { uid: '123', email: 'test@example.com' },
    });
    mockCreateUser.mockResolvedValueOnce({ data: { insert_users_one: { id: '123' } } });

    render(<FirebaseSignup />);

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByText('Sign up'));

    await waitFor(() => {
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(),
        'test@example.com',
        'password123'
      );
      expect(mockCreateUser).toHaveBeenCalledWith({
        variables: {
          id: '123',
          provider: 'firebase',
          email: 'test@example.com',
          name: 'test@example.com',
        },
      });
      expect(toast.success).toHaveBeenCalledWith('Signup successful!');
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  test('displays loading state during form submission', async () => {
    (useMutation as jest.Mock).mockReturnValue([mockCreateUser, { loading: true, error: null }]);

    render(<FirebaseSignup />);

    fireEvent.click(screen.getByText('Signing up...'));
    expect(screen.getByText('Signing up...')).toBeInTheDocument();
    
  });

  test('displays error message on Firebase authentication failure', async () => {
    (createUserWithEmailAndPassword as jest.Mock).mockRejectedValueOnce(new Error('Firebase error'));

    render(<FirebaseSignup />);

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByText('Sign up'));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Unable to register');
    });
  });

  test('displays error message on Hasura mutation failure', async () => {
    (createUserWithEmailAndPassword as jest.Mock).mockResolvedValueOnce({
      user: { uid: '123', email: 'test@example.com' },
    });
    mockCreateUser.mockRejectedValueOnce(new Error('Hasura error'));

    render(<FirebaseSignup />);

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByText('Sign up'));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('user creation failed.');
      expect(toast.error).toHaveBeenCalledWith('Unable to register');
    });
  });
});