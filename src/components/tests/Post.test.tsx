import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { ContentType } from "../ModalCreatePost";
import { Post } from "../Post";

// vi.mock("date-fns", () => ({
//   format() {
//     return "25 de dezembro 2022";
//   },
//   formatDistanceToNow() {
//     return "a menos de um minuto";
//   },
// }));

const author = {
  name: "fake-name",
avatarUrl: "fake-avatar-url",
  role: "fake",
};

const content: ContentType[][] = [
  [
    { type: "paragraph", content: "fake-paragraph-content" },
    { type: "link", content: "fake-link-content" },
  ],
];

describe("<Post />", () => {
  beforeEach(() => {
    vi.setSystemTime(new Date())
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should render Post with paragraph and link", () => {
    render(
      <Post
        id="fake-id"
        author={author}
        content={content}
        publishedAt={new Date()}
      />
    );

    expect(screen.getByText("fake-paragraph-content")).toBeInTheDocument();
    expect(screen.getByText("fake-link-content")).toBeInTheDocument();
  });

  it("should create comment", async () => {
    const user = userEvent.setup();
    render(
      <Post
        id="fake-id"
        author={author}
        content={content}
        publishedAt={new Date()}
      />
    );

    await user.type(screen.getByRole("textbox"), "Novo post");
    await user.click(screen.getByRole("button", { name: /publicar/i }));

    expect(screen.getByText("Novo post")).toBeInTheDocument();
  });

  it("should delete comment", async () => {
    const user = userEvent.setup();
    render(
      <Post
        id="fake-id"
        author={author}
        content={content}
        publishedAt={new Date()}
      />
    );

    await user.type(screen.getByRole("textbox"), "Novo post");
    await user.click(screen.getByRole("button", { name: /publicar/i }));

    expect(screen.queryByText("Novo post")).toBeInTheDocument();

    await user.click(screen.getByTitle("Deletar comentário"));

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /excluir comentário/i,
      })
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /sim, excluir/i }));

    expect(screen.queryByText("Novo post")).not.toBeInTheDocument();
  });

  it("should invalid comment", async () => {
    const user = userEvent.setup();
    render(
      <Post
        id="fake-id"
        author={author}
        content={content}
        publishedAt={new Date()}
      />
    );

    await user.click(screen.getByRole("button", { name: /publicar/i }));

    const sut = screen.getByRole("textbox");

    expect(sut).toBeInvalid();
  });
});
