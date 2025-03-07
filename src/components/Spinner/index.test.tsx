import { render, screen } from "@testing-library/react";
import { Spinner } from "../Spinner";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import "@testing-library/jest-dom";

jest.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: ({ icon }: { icon: any }) => (
    <div data-testid="spinner-icon">{icon === faCircleNotch && "Spinner Icon"}</div>
  ),
}));

describe("Spinner Component", () => {
  test("renders Spinner component", () => {
    render(<Spinner />);
    
    const spinnerElement = screen.getByTestId("spinner-icon");
    expect(spinnerElement).toBeInTheDocument();
    expect(spinnerElement).toHaveTextContent("Spinner Icon");
  });

  test("has the correct styling classes", () => {
    const { container } = render(<Spinner />);
    expect(container.firstChild).toHaveClass("h-screen flex justify-center items-center");
  });
});
