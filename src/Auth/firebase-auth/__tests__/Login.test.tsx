import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import FirebaseLogin from "../Login";
import { auth, GoogleAuthProvider, GithubAuthProvider } from "@/utils/__mocks__/firebase";
import "@testing-library/jest-dom";
import { useMutation, useQuery } from "@apollo/client";
import { MemoryRouter } from "react-router-dom";

jest.mock("@/utils/__mocks__/firebase");
jest.mock("@apollo/client");

describe("FirebaseLogin", () => {
  beforeEach(() => {
    (useMutation as jest.Mock).mockReturnValue([
      jest.fn(),
      { loading: false, error: null },
    ]);

    (useQuery as jest.Mock).mockReturnValue({
      data: { users_by_pk: null },
      loading: false,
      error: null,
    });
  });

  it("renders the login form", () => {
    render(
      <MemoryRouter>
        <FirebaseLogin />
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("handles email/password login", async () => {
    (auth.signInWithEmailAndPassword as jest.Mock).mockResolvedValue({});

    render(
      <MemoryRouter>
        <FirebaseLogin />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByText("Login"));

    await waitFor(() => {
      expect(auth.signInWithEmailAndPassword).toHaveBeenCalledWith(
        auth,
        "test@example.com",
        "password123"
      );
    });
  });

  it("handles Google login", async () => {
    (auth.signInWithPopup as jest.Mock).mockResolvedValue({
      user: { id: "google-uid", email: "google@example.com", name: "Google User" },
    });

    render(
      <MemoryRouter>
        <FirebaseLogin />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Login with Google"));

    await waitFor(() => {
      expect(auth.signInWithPopup).toHaveBeenCalledWith(auth, new GoogleAuthProvider());
      expect(useMutation).toHaveBeenCalled();
    });
  });

  it("handles GitHub login", async () => {
    (auth.signInWithPopup as jest.Mock).mockResolvedValue({
      user: { id: "github-uid", email: "github@example.com", name: "GitHub User" },
    });

    render(
      <MemoryRouter>
        <FirebaseLogin />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Login with GitHub"));

    await waitFor(() => {
      expect(auth.signInWithPopup).toHaveBeenCalledWith(auth, new GithubAuthProvider());
      expect(useMutation).toHaveBeenCalled();
    });
  });
});