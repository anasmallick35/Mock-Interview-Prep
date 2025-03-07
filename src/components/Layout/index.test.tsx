import { render, screen } from "@testing-library/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from ".";
import "@testing-library/jest-dom";

jest.mock("@/containers/Header", () => () => <div data-testid="header">Header</div>);

describe("Layout Component", () => {
  test("renders Header component", () => {
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );

    const headerElement = screen.getByTestId("header");
    expect(headerElement).toBeInTheDocument();
  });

  test("renders the Outlet content", () => {
    const OutletMock = () => <div data-testid="outlet">Outlet Content</div>;

    render(
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<OutletMock />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );

    const outletElement = screen.getByTestId("outlet");
    expect(outletElement).toBeInTheDocument();
  });
});
