import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "@/components/Hero";

describe("Hero Component", () => {
    it("renders the main heading", () => {
        render(<Hero />);
        expect(
            screen.getByRole("heading", { level: 1, name: /real-time crypto/i }),
        ).toBeInTheDocument();
    });

    it("renders the Explore Markets CTA", () => {
        render(<Hero />);
        expect(
            screen.getByRole("link", { name: /explore markets/i }),
        ).toHaveAttribute("href", "#market-table");
    });

    it("renders the View Source link to GitHub", () => {
        render(<Hero />);
        expect(
            screen.getByRole("link", { name: /view source/i }),
        ).toHaveAttribute(
            "href",
            "https://github.com/mortal22soul/raftlabs-assignment",
        );
    });

    it("renders the Live Market Data badge", () => {
        render(<Hero />);
        expect(screen.getByText(/market data/i)).toBeInTheDocument();
    });

    it("renders the subtitle description", () => {
        render(<Hero />);
        expect(
            screen.getByText(/track the top 20 cryptocurrencies/i),
        ).toBeInTheDocument();
    });
});
