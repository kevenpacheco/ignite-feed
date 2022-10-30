import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Avatar } from "../Avatar";

describe("<Avatar />", () => {
  const src = "https://github.com/kevenpacheco.png";

  it("should render Avatar", () => {
    render(<Avatar src={src} />);

    const sut = screen.getByRole("img");

    expect(sut).toBeInTheDocument();
    expect(sut).toHaveAttribute("src", src);
  });

  it("should render Avatar with border", () => {
    render(<Avatar src={src} hasBorder />);

    const sut = screen.getByRole("img");

    expect(sut).toHaveClass("avatarWithBorder");
  });
});
