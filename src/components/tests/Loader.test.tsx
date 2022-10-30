import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Loader } from "../Loader";

describe("<Loader />", () => {
  it("should render Loader", () => {
    render(<Loader />);

    const sut = screen.getByTestId("loader");

    expect(sut).toBeInTheDocument();
  });
});
