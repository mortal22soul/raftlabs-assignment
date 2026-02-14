import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the API call
vi.mock("@/lib/api", () => ({
  getMarketData: vi.fn().mockResolvedValue([
    {
      id: "bitcoin",
      symbol: "btc",
      name: "Bitcoin",
      image: "https://example.com/btc.png",
      current_price: 50000,
      market_cap: 1000000000000,
      market_cap_rank: 1,
      price_change_percentage_24h: 2.5,
      last_updated: "2024-01-01T00:00:00Z",
    },
    {
      id: "ethereum",
      symbol: "eth",
      name: "Ethereum",
      image: "https://example.com/eth.png",
      current_price: 3000,
      market_cap: 350000000000,
      market_cap_rank: 2,
      price_change_percentage_24h: -1.2,
      last_updated: "2024-01-01T00:00:00Z",
    },
  ]),
}));

import sitemap from "@/app/sitemap";

describe("Sitemap Generation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("generates sitemap entries", async () => {
    const entries = await sitemap();
    expect(entries).toBeDefined();
    expect(entries.length).toBeGreaterThan(0);
  });

  it("includes the homepage as the first entry", async () => {
    const entries = await sitemap();
    expect(entries[0].url).toContain("raftlabs-assignment-sage.vercel.app");
    expect(entries[0].priority).toBe(1);
  });

  it("includes dynamic coin routes", async () => {
    const entries = await sitemap();
    const coinEntries = entries.filter((e) => e.url.includes("/coins/"));
    expect(coinEntries.length).toBe(2); // mocked 2 coins
  });

  it("sets correct priority for coin pages", async () => {
    const entries = await sitemap();
    const coinEntry = entries.find((e) => e.url.includes("/coins/bitcoin"));
    expect(coinEntry).toBeDefined();
    expect(coinEntry!.priority).toBe(0.8);
  });

  it("sets homepage changeFrequency to daily", async () => {
    const entries = await sitemap();
    expect(entries[0].changeFrequency).toBe("daily");
  });

  it("sets coin changeFrequency to always", async () => {
    const entries = await sitemap();
    const coinEntry = entries.find((e) => e.url.includes("/coins/"));
    expect(coinEntry!.changeFrequency).toBe("always");
  });

  it("includes lastModified dates", async () => {
    const entries = await sitemap();
    entries.forEach((entry) => {
      expect(entry.lastModified).toBeDefined();
    });
  });
});
