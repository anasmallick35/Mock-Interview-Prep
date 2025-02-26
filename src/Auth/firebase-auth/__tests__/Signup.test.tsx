import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import FirebaseSignup from "../Signup";
import { auth, createUserWithEmailAndPassword } from "../../../utils/firebase";
import { useMutation } from "@apollo/client";
import "@testing-library/jest-dom";

jest.mock("../../../utils/firebase");
jest.mock("@apollo/client");

describe("FirebaseSignup", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the signup form", () => {
    render(<FirebaseSignup />);
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
  });

  it("handles email/password signup", async () => {
    (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue({
      user: { uid: "test-uid", email: "test@example.com" },
    });
    (useMutation as jest.Mock).mockReturnValue([
      jest.fn(),
      { loading: false, error: null },
    ]);

    render(<FirebaseSignup />);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByText("Sign Up"));

    await waitFor(() => {
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        auth,
        "test@example.com",
        "password123"
      );
      expect(useMutation).toHaveBeenCalled();
    });
  });
});
