import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import FirebaseLogout from "../Logout";
import { auth } from "@/utils/firebase";



jest.mock("@/utils/firebase");

describe("FirebaseLogout", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the logout button", () => {
    const { getByText } = render(<FirebaseLogout />);
    expect(getByText("Log Out")).toBeInTheDocument();
  });

  it("calls auth.signOut on button click", () => {

    (auth.signOut as jest.Mock).mockResolvedValue({});

    const { getByText } = render(<FirebaseLogout />);
    fireEvent.click(getByText("Log Out"));

    expect(auth.signOut).toHaveBeenCalled();
  });
});