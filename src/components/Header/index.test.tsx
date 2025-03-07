import { render, screen } from "@testing-library/react";
import Header from ".";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

jest.mock("../Spinner", () => () => <div>Loading...</div>);

jest.mock("../DropdownMenu", () => () => <div>Dropdown</div>);


describe("Header Component", () => {
  const mockData = {
    users_by_pk: {
      role: "user",
      points: 100,
      picture: "https://example.com/profile.jpg",
    },
  };


  test("renders CrackTogether logo", () => {
    render(
      <BrowserRouter>
        <Header data={undefined} isLoading={false} isAuthenticated={false}/>
      </BrowserRouter>
    );
    expect(screen.getByText("CrackTogether")).toBeInTheDocument();
  });



  it("renders the Header component with authenticated user", () => {
    render(
      <BrowserRouter>
        <Header data={mockData} isLoading={false} isAuthenticated={true} />
      </BrowserRouter>
    );
    expect(screen.getByText("CrackTogether")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("Your Contribution")).toBeInTheDocument();
    expect(screen.getByText("Dropdown")).toBeInTheDocument();
  });

  it("renders the Header component with guest login button", () => {
    render(
      <BrowserRouter>
        <Header data={null} isLoading={false} isAuthenticated={false} />
      </BrowserRouter>
    );
    expect(screen.getByText("Guest Login")).toBeInTheDocument();
  });
});
