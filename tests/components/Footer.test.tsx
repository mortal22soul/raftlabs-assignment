import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "@/components/Footer";

describe("Footer Component", () => {
  it("renders the Source link", () => {
    render(<Footer />);
    expect(screen.getByText("Source")).toBeInTheDocument();
  });

  it("links to the GitHub repository", () => {
    render(<Footer />);
    const link = screen.getByRole("link", { name: /source/i });
    expect(link).toHaveAttribute(
      "href",
      "https://github.com/mortal22soul/raftlabs-assignment",
    );
  });

  it("opens the link in a new tab", () => {
    render(<Footer />);
    const link = screen.getByRole("link", { name: /source/i });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders within a footer element", () => {
    const { container } = render(<Footer />);
    expect(container.querySelector("footer")).toBeInTheDocument();
  });
});
