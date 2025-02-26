import { renderHook } from "@testing-library/react";
import useAuth from "../useAuth";
import { auth } from "@/utils/firebase";
import { useAuth0 } from "@auth0/auth0-react";

jest.mock("@/utils/firebase");
jest.mock("@auth0/auth0-react");

describe("useAuth", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns the correct initial state", () => {
    (useAuth0 as jest.Mock).mockReturnValue({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });

    
    (auth.onAuthStateChanged as jest.Mock).mockImplementation((callback) => {
      callback(null); 
      return jest.fn(); 
    });

    const { result } = renderHook(() => useAuth());

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.isLoading).toBe(false);
  });

  it("handles Firebase authentication", () => {
    const firebaseUser = { uid: "firebase-uid", email: "firebase@example.com" };

    (useAuth0 as jest.Mock).mockReturnValue({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });

    
    (auth.onAuthStateChanged as jest.Mock).mockImplementation((callback) => {
      callback(firebaseUser); 
      return jest.fn(); 
    });

    const { result } = renderHook(() => useAuth());

    expect(result.current.user).toEqual(firebaseUser);
    expect(result.current.isAuthenticated).toBe(true);
  });

  it("handles Auth0 authentication", () => {
    const auth0User = { sub: "auth0-uid", email: "auth0@example.com" };

    (useAuth0 as jest.Mock).mockReturnValue({
      user: auth0User,
      isAuthenticated: true,
      isLoading: false,
    });

    
    (auth.onAuthStateChanged as jest.Mock).mockImplementation((callback) => {
      callback(null); 
      return jest.fn(); 
    });

    const { result } = renderHook(() => useAuth());

    expect(result.current.user).toEqual(auth0User);
    expect(result.current.isAuthenticated).toBe(true);
  });
});