import { render, screen } from '@testing-library/react';
import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from '@apollo/client';
import Header from '.';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';


jest.mock('@auth0/auth0-react', () => ({
  useAuth0: jest.fn(),
}));


jest.mock('@apollo/client', () => ({
    useQuery: jest.fn(),
    gql: jest.fn(),  
  }));


jest.mock('@/auth/Login', () => () => <div>Login</div>);
jest.mock('@/auth/Logout', () => () => <div>Logout</div>);
jest.mock('@/auth/guestLogin', () => () => <div>GuestLogin</div>);

describe('Header Component', () => {


  const mockUseAuth0 = useAuth0 as jest.Mock;
  const mockUseQuery = useQuery as jest.Mock;

  beforeEach(() => {

    jest.clearAllMocks();


    mockUseAuth0.mockReturnValue({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });

    mockUseQuery.mockReturnValue({
      data: null,
      loading: false,
      error: null,
    });
  });

  const renderMock =()=>  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );

  it('renders the loading state when authentication is loading', () => {
    mockUseAuth0.mockReturnValue({
      user: null,
      isAuthenticated: false,
      isLoading: true,
    });

    renderMock()
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
  });

  it('renders the Login and GuestLogin buttons when not authenticated and not in guest mode', () => {
    
    mockUseAuth0.mockReturnValue({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('GuestLogin')).toBeInTheDocument();
  });

  it('renders the Logout button and profile when authenticated', () => {
   
    mockUseAuth0.mockReturnValue({
      user: { sub: '123', name: 'John Doe' },
      isAuthenticated: true,
      isLoading: false,
    });

    mockUseQuery.mockReturnValue({
      data: {
        users_by_pk: {
          picture: 'https://example.com/profile.jpg',
          name: 'John Doe',
        },
      },
      loading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText('Logout')).toBeInTheDocument();
    expect(screen.getByAltText('John Doe')).toBeInTheDocument();
  });

  it('renders the Login button when in guest mode', () => {
    mockUseAuth0.mockReturnValue({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });

    Storage.prototype.getItem = jest.fn(() => JSON.stringify({ name: 'Guest' }));

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.queryByText('GuestLogin')).not.toBeInTheDocument();
  });

  it('renders an error message when there is an error fetching user role', () => {
    mockUseAuth0.mockReturnValue({
      user: { sub: '123', name: 'John Doe' },
      isAuthenticated: true,
      isLoading: false,
    });

    mockUseQuery.mockReturnValue({
      data: null,
      loading: false,
      error: new Error('Failed to fetch user role'),
    });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText('Error loading profile')).toBeInTheDocument();
  });

  it('renders "No profile found" when user data is not available', () => {
    mockUseAuth0.mockReturnValue({
      user: { sub: '123', name: 'John Doe' },
      isAuthenticated: true,
      isLoading: false,
    });

    mockUseQuery.mockReturnValue({
      data: { users_by_pk: null },
      loading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText('No profile found')).toBeInTheDocument();
  });
});