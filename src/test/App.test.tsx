import {
  act,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import App from "../App";

describe("<App />", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should init render with loader component", () => {
    render(<App />);

    const sut = screen.getByTestId("loader");

    expect(sut).toBeInTheDocument();
  });

  it("should init render with loader component and show App after 5 seconds", async () => {
    render(<App />);

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(screen.getByTestId("app")).toBeInTheDocument();
  });

  it("should create a new post", () => {
    render(<App />);

    act(() => {
      vi.advanceTimersToNextTimer();
    });

    fireEvent.click(screen.getByRole("button", { name: /criar publicação/i }));
    const fakePostText = "created new fake post";
    fireEvent.change(
      screen.getByPlaceholderText("No que você está pensando?"),
      { target: { value: fakePostText } }
    );
    fireEvent.click(screen.getByRole("button", { name: /publicar/i }));

    const sut = screen.getByText(fakePostText);
    expect(sut).toBeInTheDocument();
  });

  it("should cancel create a new post", () => {
    render(<App />);

    act(() => {
      vi.advanceTimersToNextTimer();
    });

    fireEvent.click(screen.getByRole("button", { name: /criar publicação/i }));

    const sut = screen.getByRole("heading", {
      level: 2,
      name: /criar publicação/i,
    });
    expect(sut).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /cancelar/i }));

    expect(sut).not.toBeInTheDocument();
  });
});
