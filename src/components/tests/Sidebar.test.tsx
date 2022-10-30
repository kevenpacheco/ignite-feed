import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Sidebar } from "../Sidebar";

describe("<Sidebar />", () => {
  it("should render Sidebar", () => {
    render(<Sidebar />);

    const sut = screen.getByRole("complementary")

    expect(sut).toBeInTheDocument();
  });
});
