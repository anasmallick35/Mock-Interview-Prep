import env from "@/utils/config"; 
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FirebaseLogin from "../Login";
import { auth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "@/utils/firebase";
import { BrowserRouter } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";
import { toast } from "sonner";
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

// Mock Apollo Client
jest.mock("@/utils/apolloClient", () => {
  const mockClient = {
    query: jest.fn(),
  };
  return {
    __esModule: true,
    default: mockClient,
  };
});

// Mock Sonner (Toast notifications)
jest.mock("sonner", () => ({ toast: { error: jest.fn(), success: jest.fn() } }));

describe("FirebaseLogin Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders login form fields", () => {
    render(
      <MockedProvider>
        <BrowserRouter>
          <FirebaseLogin />
        </BrowserRouter>
      </MockedProvider>
    );

    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your password")).toBeInTheDocument();
  });

  test("handles email/password login successfully", async () => {
    (signInWithEmailAndPassword as jest.Mock).mockResolvedValue({});

    render(
      <MockedProvider>
        <BrowserRouter>
          <FirebaseLogin />
        </BrowserRouter>
      </MockedProvider>
    );

    fireEvent.change(screen.getByPlaceholderText("Enter your email"), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Enter your password"), { target: { value: "password123" } });
    fireEvent.click(screen.getByText("Log in"));

    await waitFor(() =>
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, "test@example.com", "password123")
    );
  });

  test("shows error message on failed login", async () => {
    (signInWithEmailAndPassword as jest.Mock).mockRejectedValue(new Error("Login Failed"));

    render(
      <MockedProvider>
        <BrowserRouter>
          <FirebaseLogin />
        </BrowserRouter>
      </MockedProvider>
    );

    fireEvent.change(screen.getByPlaceholderText("Enter your email"), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Enter your password"), { target: { value: "wrongpassword" } });
    fireEvent.click(screen.getByText("Log in"));

    await waitFor(() => expect(toast.error).toHaveBeenCalledWith("Unable to Login"));
  });

  test("handles Google login", async () => {
    const mockUser = { uid: "123", email: "test@example.com" };
    const mockProvider = new GoogleAuthProvider();

    (signInWithPopup as jest.Mock).mockResolvedValue({
      user: mockUser,
      provider: "google",
    });

    render(
      <MockedProvider>
        <BrowserRouter>
          <FirebaseLogin />
        </BrowserRouter>
      </MockedProvider>
    );

    fireEvent.click(screen.getByText("Sign in with Google"));

    await waitFor(() => expect(signInWithPopup).toHaveBeenCalledWith(auth, mockProvider));
  });

  test("uses environment variables", () => {
    expect(env.VITE_FIREBASE_API_KEY).toBe("mock-api-key");
    expect(env.VITE_FIREBASE_PROJECT_ID).toBe("mock-project-id");
  });
});
