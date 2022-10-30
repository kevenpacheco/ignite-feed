import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Textarea } from "../Textarea";

describe("<Textarea />", () => {
  it("should render Textarea", () => {
    render(<Textarea />);

    const sut = screen.getByRole("textbox");

    expect(sut).toBeInTheDocument();
  });
});
