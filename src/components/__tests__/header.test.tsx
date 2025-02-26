import "@testing-library/jest-dom";
import { render, screen, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "../Header";

jest.mock("@/Auth/O-Auth/Login", () => () => <button>OAuth Login</button>);
jest.mock("@/Auth/O-Auth/Logout", () => () => <button>OAuth Logout</button>);
jest.mock("@/Auth/firebase-auth/Logout", () => () => <button>Firebase Logout</button>);


const renderHeader = (props: Partial<React.ComponentProps<typeof Header>> = {}) => {
  return render(
    <BrowserRouter>
      <Header
        data={props.data || {}}
        isLoading={props.isLoading || false}
        isAuthenticated={props.isAuthenticated || false}
        isFirebaseAuthenticated={props.isFirebaseAuthenticated || false}
        isOAuthAuthenticated={props.isOAuthAuthenticated || false}
        isGuest={props.isGuest || false}
      />
    </BrowserRouter>
  );
};

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

describe("Header Component", () => {

  test("renders CrackTogether logo", () => {
    renderHeader();
    expect(screen.getByText("CrackTogether")).toBeInTheDocument();
  });

  test("renders login buttons when not authenticated", () => {
    renderHeader({ isAuthenticated: false });
    expect(screen.getByText("OAuth Login")).toBeInTheDocument();
    expect(screen.getByText("Firebase Login")).toBeInTheDocument();
    expect(screen.getByText("Firebase Signup")).toBeInTheDocument();
    expect(screen.getByText("Guest Login")).toBeInTheDocument();
  });

  test("renders FirebaseLogout and Logout when authenticated", () => {
    renderHeader({ isAuthenticated: true, isFirebaseAuthenticated: true, isOAuthAuthenticated: true });
    expect(screen.getByText("Firebase Logout")).toBeInTheDocument();
    expect(screen.getByText("OAuth Logout")).toBeInTheDocument();
  });

  test("does not show logout buttons when not authenticated", () => {
    renderHeader({ isAuthenticated: false });
    expect(screen.queryByText("Firebase Logout")).toBeNull();
    expect(screen.queryByText("OAuth Logout")).toBeNull();
  });

  test("renders admin dashboard link when user is an admin", () => {
    renderHeader({
      isAuthenticated: true,
      data: { users_by_pk: { role: "admin", picture: "profile.jpg" } },
    });
    expect(screen.getByText("Admin Dashboard")).toBeInTheDocument();
  });

  test("renders profile picture when authenticated", () => {
    renderHeader({
      isAuthenticated: true,
      data: { users_by_pk: { picture: "profile.jpg" } },
    });
    const profileImage = screen.getByRole("img");
    expect(profileImage).toHaveAttribute("src", "profile.jpg");
  });

  test("does not show profile picture when user is not authenticated", () => {
    renderHeader({ isAuthenticated: false });
    expect(screen.queryByRole("img")).toBeNull();
  });
});
