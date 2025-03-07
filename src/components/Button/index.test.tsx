import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../Button";
import "@testing-library/jest-dom";

describe("Button Component", () => {
  test("renders button with children text", () => {
    render(<Button>Click Me</Button>);
    const buttonElement = screen.getByRole("button", { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
  });

  test("triggers onClick event when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    const buttonElement = screen.getByRole("button", { name: /click me/i });
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("renders with default type as submit", () => {
    render(<Button>Submit</Button>);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toHaveAttribute("type", "submit");
  });

  test("renders with provided type", () => {
    render(<Button type="reset">Reset</Button>);
    const buttonElement = screen.getByRole("button", { name: /reset/i });
    expect(buttonElement).toHaveAttribute("type", "reset");
  });

  test("applies additional classNames", () => {
    render(<Button className="custom-class">Styled Button</Button>);
    const buttonElement = screen.getByRole("button", { name: /styled button/i });
    expect(buttonElement).toHaveClass("custom-class");
  });

  test("disables button when disabled prop is true", () => {
    render(<Button disabled>Disabled</Button>);
    const buttonElement = screen.getByRole("button", { name: /disabled/i });
    expect(buttonElement).toBeDisabled();
    expect(buttonElement).toHaveClass("opacity-50 cursor-not-allowed");
  });
});
