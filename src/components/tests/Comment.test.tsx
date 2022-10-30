import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Comment } from "../Comment";

describe("<Comment />", () => {
  const user = userEvent.setup();
  const content = "Conteudo de testes";

  it("should render default Comment", () => {
    render(<Comment content={content} onDeleteComment={() => {}} />);

    const sut = screen.getByText(content);

    expect(sut).toBeInTheDocument();
  });

  it("should increment like counter", async () => {
    render(<Comment content={content} onDeleteComment={() => {}} />);

    const sut = screen.getByRole("button", { name: /aplaudir 0/i });

    expect(sut).toBeInTheDocument();

    await user.click(sut);

    expect(sut).toContain(/aplaudir 1/i);
  });

  it("should called onDeleteComment prop function when confirm delete comment", async () => {
    const handleDelete = vi.fn();
    render(<Comment content={content} onDeleteComment={handleDelete} />);

    await user.click(screen.getByTitle("Deletar comentário"));
    await user.click(screen.getByRole("button", { name: /sim, excluir/i }));

    expect(handleDelete).toBeCalled();
  });

  it("should called onClose prop function when click close button", async () => {
    render(<Comment content={content} onDeleteComment={() => {}} />);

    await user.click(screen.getByTitle("Deletar comentário"));
    await user.click(screen.getByRole("button", { name: /cancelar/i }));

    expect(
      screen.queryByRole("heading", {
        level: 2,
        name: /excluir comentário/i,
      })
    ).not.toBeInTheDocument();
  });
});
