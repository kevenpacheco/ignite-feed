import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ModalBase } from "../ModalBase";

describe("<ModalBase />", () => {
  it("should render ModalBase", () => {
    render(<ModalBase />);

    const sut = screen.getByTestId("modal-base");

    expect(sut).toBeInTheDocument();
  });
});
