import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import PastInterviews from '.';
import '@testing-library/jest-dom';


jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock('@auth0/auth0-react', () => ({
  useAuth0: jest.fn(),
}));

describe('PastInterviews Component', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
   
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);

   
    (useAuth0 as jest.Mock).mockReturnValue({
      user: { sub: '123' }, 
      isAuthenticated: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('displays the Previous Mock Interview heading when interviews are present', () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({
      loading: false,
      interviews: [
        {
          id: '1',
          jsonMockResp: '{}',
          jobTitle: 'Software Engineer',
          topic: 'React',
          created_at: '2024-02-14',
          userId: '123',
          interviewId: '1001',
        },
      ],
      error: null,
    });
  
    render(
      <MemoryRouter>
        <PastInterviews />
      </MemoryRouter>
    );
  
    expect(screen.getByText('Previous Mock Interview')).toBeInTheDocument();
  });

  it('renders correctly when no interviews are available', () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({
      loading: false,
      interviews: [],
      error: null,
    });

    render(
      <MemoryRouter>
        <PastInterviews />
      </MemoryRouter>
    );

    
    expect(screen.queryByText('Previous Mock Interview')).not.toBeInTheDocument();
  });
  
  it('displays loading state', () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({
      loading: true,
      interviews: [],
      error: null,
    });

    render(
      <MemoryRouter>
        <PastInterviews />
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays error state', () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({
      loading: false,
      interviews: [],
      error: 'Error fetching interviews',
    });

    render(
      <MemoryRouter>
        <PastInterviews />
      </MemoryRouter>
    );

    expect(screen.getByText('Error: Error fetching interviews')).toBeInTheDocument();
  });

  it('displays interviews when data is available', () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({
      loading: false,
      interviews: [
        {
          id: '1',
          jsonMockResp: '{}',
          jobTitle: 'Software Engineer',
          topic: 'React',
          created_at: '2024-02-14',
          userId: '123',
          interviewId: '1001',
        },
      ],
      error: null,
    });

    render(
      <MemoryRouter>
        <PastInterviews />
      </MemoryRouter>
    );

    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
  });
});
