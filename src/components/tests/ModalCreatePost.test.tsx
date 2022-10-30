import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { ModalCreatePost } from "../ModalCreatePost";
import uuid from "react-uuid";

vi.mock("react-uuid", () => ({
  default() {
    return "fake-id";
  },
}));

describe("<ModalCreatePost />", () => {
  it("should render ModalCreatePost", () => {
    render(<ModalCreatePost onCreatePost={() => {}} onClose={() => {}} />);

    const sut = screen.getByRole("heading", {
      level: 2,
      name: /criar publicação/i,
    });

    expect(sut).toBeInTheDocument();
  });

  it("should close ModalCreatePost", async () => {
    const user = userEvent.setup();
    const closeModal = vi.fn();

    render(<ModalCreatePost onCreatePost={() => {}} onClose={closeModal} />);

    const sut = screen.getByRole("button", { name: /cancelar/i });

    await user.click(sut);

    expect(closeModal).toBeCalled();
  });

  it("should create a post with a one-line block", async () => {
    const user = userEvent.setup();

    vi.setSystemTime(new Date());

    const createPost = vi.fn();

    render(<ModalCreatePost onCreatePost={createPost} onClose={() => {}} />);

    const newPostContent = "Conteudo do novo post";

    await user.type(
      screen.getByPlaceholderText(/No que você está pensando?/i),
      newPostContent
    );
    await user.click(screen.getByRole("button", { name: /publicar/i }));

    expect(createPost).toHaveBeenCalledWith({
      id: uuid(),
      author: {
        name: "Keven Pacheco",
        role: "Web Developer",
        avatarUrl: "https://github.com/kevenpacheco.png",
      },
      content: [[{ type: "paragraph", content: newPostContent }]],
      publishedAt: new Date(),
    });
    vi.useRealTimers();
  });
});
