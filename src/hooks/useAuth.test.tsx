import { renderHook } from '@testing-library/react';
import useAuth from '@/hooks/useAuth';
import { useAuth0 } from '@auth0/auth0-react';
import { useAuthState } from 'react-firebase-hooks/auth';
import "@testing-library/jest-dom";


jest.mock('@auth0/auth0-react', () => ({
  useAuth0: jest.fn(),
}));

jest.mock('react-firebase-hooks/auth', () => ({
  useAuthState: jest.fn(),
}));

describe('useAuth Hook', () => {
  beforeEach(() => {
    (useAuth0 as jest.Mock).mockReturnValue({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
    (useAuthState as jest.Mock).mockReturnValue([null, false, null]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return initial auth state', () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.isLoading).toBe(false);
  });
});