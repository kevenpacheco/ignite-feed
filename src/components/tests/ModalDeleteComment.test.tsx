import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { ModalDeleteComment } from "../ModalDeleteComment";

describe("<ModalDeleteComment />", () => {
  it("should render ModalDeleteComment", () => {
    render(
      <ModalDeleteComment
        onConfirmDeleteComment={() => {}}
        onClose={() => {}}
      />
    );

    const sut = screen.getByRole('heading', {
      level: 2,
      name: /excluir comentário/i
    });

    expect(sut).toBeInTheDocument();
  });

  it("should call onClose function when click in cancel button", async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();
    render(
      <ModalDeleteComment
        onConfirmDeleteComment={() => {}}
        onClose={handleClose}
      />
    );

    await user.click(screen.getByRole("button", { name: /cancelar/i }));

    expect(handleClose).toBeCalled();
  });

  it("should call onConfirmDeleteComment function when click in delete button", async () => {
    const user = userEvent.setup();
    const handleDelete = vi.fn();
    render(
      <ModalDeleteComment
        onConfirmDeleteComment={handleDelete}
        onClose={() => {}}
      />
    );

    await user.click(screen.getByRole("button", { name: /sim, excluir/i }));

    expect(handleDelete).toBeCalled();
  });
});
