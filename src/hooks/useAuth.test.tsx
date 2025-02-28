import env from "@/utils/config";
import { useAuth0 } from "@auth0/auth0-react";
import { useAuthState } from "react-firebase-hooks/auth";
import "@testing-library/jest-dom";

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

jest.mock("@/utils/apolloClient", () => {
  const mockClient = {
    query: jest.fn(),
  };
  return {
    __esModule: true,
    default: mockClient,
  };
});

jest.mock("@auth0/auth0-react", () => ({
  useAuth0: jest.fn(),
}));

jest.mock("react-firebase-hooks/auth", () => ({
  useAuthState: jest.fn(),
}));

describe("useAuth Hook", () => {
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

  test("uses environment variables", () => {
    expect(env.VITE_FIREBASE_API_KEY).toBe("mock-api-key");
    expect(env.VITE_FIREBASE_PROJECT_ID).toBe("mock-project-id");
  });
});
