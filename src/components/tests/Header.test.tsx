import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Header } from "../Header";

describe("<Header />", () => {
  it("should render Header", () => {
    render(<Header />);

    const sut = screen.getByRole("banner");

    expect(sut).toBeInTheDocument();
  });
});
