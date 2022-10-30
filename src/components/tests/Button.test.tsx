import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Button } from "../Button";

describe("<Button />", () => {
  it("should render default Button", () => {
    render(<Button>Button Test</Button>);

    const sut = screen.getByRole("button", { name: /Button Test/i });

    expect(sut).toBeInTheDocument();
  });

  it("should render Button with style variant of type link", () => {
    render(<Button variant="link">Button Test</Button>);

    const sut = screen.getByRole("button", { name: /Button Test/i });
    
    expect(sut).toHaveClass('buttonLink');
  });
});
