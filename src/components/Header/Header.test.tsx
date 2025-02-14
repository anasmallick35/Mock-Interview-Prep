
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import Header from './Header';
import '@testing-library/jest-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { GET_USER_ROLE } from '@/services/InterviewQuery';
import { MemoryRouter } from 'react-router-dom';

jest.mock('@auth0/auth0-react');

const mockAuth0 = (isAuthenticated: boolean) => {
  (useAuth0 as jest.Mock).mockReturnValue({
    isAuthenticated,
    user: isAuthenticated ? { name: 'John Doe', sub: '123' } : null,
    loginWithRedirect: jest.fn(),
    logout: jest.fn(),
  });
};


const mocks = [
  {
    request: {
      query: GET_USER_ROLE,
      variables: { userId: '123' },
    },
    result: {
      data: {
        users_by_pk: {
          role: 'admin',
        },
      },
    },
  },
];

describe('Header Component', () => {
  it('renders without crashing', () => {
    mockAuth0(false); 
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
        <Header />
        </MemoryRouter>
       
      </MockedProvider>
    );
    expect(screen.getByText('CrackTogether')).toBeInTheDocument();
  });

  it('shows login button when not authenticated', () => {
    mockAuth0(false);
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
        <Header />
        </MemoryRouter>
      </MockedProvider>
    );
    expect(screen.getByText('Log In')).toBeInTheDocument();
  });

  it('shows logout button when authenticated', async () => {
    mockAuth0(true); 
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
        <Header />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(await screen.findByText('Log Out')).toBeInTheDocument();
  });
});
