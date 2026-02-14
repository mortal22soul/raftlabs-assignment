import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Breadcrumbs } from "@/components/Breadcrumbs";

describe("Breadcrumbs Component", () => {
  const items = [
    { label: "Home", href: "/" },
    { label: "Bitcoin", active: true },
  ];

  it("renders all breadcrumb items", () => {
    render(<Breadcrumbs items={items} />);
    // "Home" appears in both the icon sr-only span and the breadcrumb item link
    const homeElements = screen.getAllByText("Home");
    expect(homeElements.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Bitcoin")).toBeInTheDocument();
  });

  it("renders the Home icon link", () => {
    render(<Breadcrumbs items={items} />);
    const homeLinks = screen.getAllByRole("link");
    expect(homeLinks[0]).toHaveAttribute("href", "/");
  });

  it("renders linked breadcrumb items with href", () => {
    render(<Breadcrumbs items={items} />);
    const homeLinks = screen.getAllByRole("link", { name: /home/i });
    expect(homeLinks.length).toBeGreaterThanOrEqual(1);
    expect(homeLinks[0]).toHaveAttribute("href", "/");
  });

  it("renders active items as plain text (not links)", () => {
    render(<Breadcrumbs items={items} />);
    const activeItem = screen.getByText("Bitcoin");
    expect(activeItem.tagName).toBe("SPAN");
    expect(activeItem).toHaveAttribute("aria-current", "page");
  });

  it("renders a nav element with aria-label", () => {
    render(<Breadcrumbs items={items} />);
    const nav = screen.getByRole("navigation", { name: /breadcrumb/i });
    expect(nav).toBeInTheDocument();
  });
});
