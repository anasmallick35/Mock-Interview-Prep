
import { render, screen, fireEvent } from '@testing-library/react';
import Dropdown from '.';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import  client  from "@/utils/apolloClient"
import "@testing-library/jest-dom";


export default {
    VITE_GUEST_ID: 'mock-hasura-guest',
  };


jest.mock('@/hooks/useAuth', () => ({
    __esModule: true,
    default: jest.fn(() => ({
      isAuthenticated: true,
      user: { uid: 'mock-user-id' },
      isFirebaseAuthenticated: true,
      isOAuthAuthenticated: false,
      isGuest: false,
      isLoading: false,
    })),
  }));
  
import env from "@/utils/config"; 
import { MockedProvider } from '@apollo/client/testing';
import { GET_USER } from '@/services/InterviewQuery';


jest.mock("@/Auth/O-Auth/Logout", () => () => <button>OAuth Logout</button>);
jest.mock("@/Auth/firebase-auth/Logout", () => () => <button>Firebase Logout</button>);

jest.mock("@apollo/client", () => {
    const actual = jest.requireActual("@apollo/client");
    return {
      ...actual,
      useQuery: jest.fn(() => ({ data: { users_by_pk: { picture: "mock-url" } } })),
    };
  });
  

  jest.mock("@/utils/apolloClient", () => {
    const mockClient = {
      query: jest.fn(),
      watchQuery: jest.fn(() => ({
        subscribe: jest.fn(),
      })),
    };
    return {
      __esModule: true,
      default: mockClient,
    };
  });
  
  const mocks = [
    {
      request: {
        query: GET_USER,
        variables: { userId: "mock-user-id" },
      },
      result: {
        data: {
          users_by_pk: {
            picture: "mock-profile-pic-url",
          },
        },
      },
    },
  ];
  
  

describe('Dropdown Component', () => {
  it('renders the Dropdown component', () => {
    render(
      <ApolloProvider client={client}>
        <Router>
          <Dropdown />
        </Router>
      </ApolloProvider>
    );
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('opens the dropdown menu when clicked', () => {
    render(
        <MockedProvider mocks={mocks} addTypename={false}>
        <Router>
          <Dropdown />
        </Router>
      </MockedProvider>
    );
    const profileImage = screen.getByRole('img');
    fireEvent.click(profileImage);
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Earnings')).toBeInTheDocument();
  });

  test("uses environment variables", () => {
    expect(env.VITE_FIREBASE_API_KEY).toBe("mock-api-key");
    expect(env.VITE_FIREBASE_PROJECT_ID).toBe("mock-project-id");
  });
});