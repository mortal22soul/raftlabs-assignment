import { describe, it, expect, vi } from "vitest";

// Mock next/font/google before importing layout metadata
vi.mock("next/font/google", () => ({
    Geist: () => ({ variable: "--font-geist-sans" }),
    Geist_Mono: () => ({ variable: "--font-geist-mono" }),
}));

import { metadata } from "@/app/layout";

describe("Homepage Metadata", () => {
    it("has a proper title configuration", () => {
        expect(metadata.title).toBeDefined();
        const title = metadata.title as { default: string; template: string };
        expect(title.default).toContain("CryptoTracker");
        expect(title.template).toContain("%s");
    });

    it("has a description", () => {
        expect(metadata.description).toBeDefined();
        expect(metadata.description!.length).toBeGreaterThan(50);
    });

    it("has OpenGraph configuration", () => {
        expect(metadata.openGraph).toBeDefined();
        const og = metadata.openGraph as { type: string; title: string };
        expect(og.type).toBe("website");
        expect(og.title).toContain("CryptoTracker");
    });

    it("has Twitter card configuration", () => {
        expect(metadata.twitter).toBeDefined();
        const twitter = metadata.twitter as { card: string };
        expect(twitter.card).toBe("summary_large_image");
    });

    it("has a canonical URL", () => {
        expect(metadata.alternates).toBeDefined();
        expect(metadata.alternates!.canonical).toBe("/");
    });

    it("has a metadataBase URL", () => {
        expect(metadata.metadataBase).toBeDefined();
        expect(metadata.metadataBase!.toString()).toContain("vercel.app");
    });

    it("has robots configuration allowing indexing", () => {
        expect(metadata.robots).toBeDefined();
        const robots = metadata.robots as { index: boolean; follow: boolean };
        expect(robots.index).toBe(true);
        expect(robots.follow).toBe(true);
    });

    it("has manifest configured", () => {
        expect(metadata.manifest).toBe("/site.webmanifest");
    });

    it("has favicon and apple touch icon", () => {
        expect(metadata.icons).toBeDefined();
        const icons = metadata.icons as { icon: string; apple: string };
        expect(icons.icon).toBe("/favicon.ico");
        expect(icons.apple).toBe("/apple-touch-icon.png");
    });
});
