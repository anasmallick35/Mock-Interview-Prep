import { render, screen, fireEvent } from "@testing-library/react";
import FirebaseLogout from "../Logout";
import { auth} from "@/utils/firebase";
import "@testing-library/jest-dom";

jest.mock("@/utils/firebase", () => ({
  auth: {
    signOut: jest.fn(),
  },
}));

describe("FirebaseLogout Component", () => {
  afterEach(() => {
    jest.clearAllMocks(); 
  });

  test("renders logout button and matches snapshot", () => {
    const { asFragment } = render(<FirebaseLogout />);
    expect(screen.getByText("Log Out")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  test("calls signOut on button click", async () => {
    render(<FirebaseLogout />);
    const button = screen.getByText("Log Out");

    fireEvent.click(button);

    expect(auth.signOut).toHaveBeenCalledTimes(1);
  });

  test("handles signOut error gracefully", async () => {
    (auth.signOut as jest.Mock).mockRejectedValue(new Error("Sign out failed"));

    render(<FirebaseLogout />);
    const button = screen.getByText("Log Out");

    fireEvent.click(button);

    expect(auth.signOut).toHaveBeenCalledTimes(1);
  });
});
