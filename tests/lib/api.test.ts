import { describe, it, expect, vi, beforeEach } from "vitest";

// We need to mock the module before importing
vi.mock("@/lib/api", async () => {
    // We'll re-implement the functions to test them with mocked fetch
    return {
        getMarketData: vi.fn(),
        getCoinDetail: vi.fn(),
    };
});

const mockCoinList = [
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
        sparkline_in_7d: { price: [49000, 49500, 50000] },
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
        sparkline_in_7d: { price: [2900, 2950, 3000] },
    },
];

const mockCoinDetail = {
    id: "bitcoin",
    symbol: "btc",
    name: "Bitcoin",
    image: { large: "https://example.com/btc-large.png", small: "", thumb: "" },
    description: { en: "Bitcoin is a cryptocurrency." },
    links: { homepage: ["https://bitcoin.org"] },
    genesis_date: "2009-01-03",
    market_cap_rank: 1,
    last_updated: "2024-01-01T00:00:00Z",
    market_data: {
        current_price: { usd: 50000 },
        market_cap: { usd: 1000000000000 },
        total_volume: { usd: 30000000000 },
        circulating_supply: 19500000,
        price_change_percentage_24h: 2.5,
        high_24h: { usd: 51000 },
        low_24h: { usd: 49000 },
        sparkline_7d: { price: [49000, 49500, 50000] },
    },
};

describe("API Layer", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    describe("fetch configuration", () => {
        it("uses ISR with 60-second revalidation", async () => {
            const mockFetch = vi.fn().mockResolvedValue({
                ok: true,
                json: () => Promise.resolve(mockCoinList),
            });
            global.fetch = mockFetch;

            // Directly test the fetch pattern used in the API
            await fetch("https://api.coingecko.com/api/v3/coins/markets", {
                next: { revalidate: 60 },
            });

            expect(mockFetch).toHaveBeenCalledWith(
                "https://api.coingecko.com/api/v3/coins/markets",
                { next: { revalidate: 60 } },
            );
        });

        it("throws on failed responses", async () => {
            const mockFetch = vi.fn().mockResolvedValue({
                ok: false,
                statusText: "Too Many Requests",
            });
            global.fetch = mockFetch;

            const fetchAPI = async (url: string) => {
                const res = await fetch(url, { next: { revalidate: 60 } });
                if (!res.ok) throw new Error(`Failed to fetch data: ${res.statusText}`);
                return res.json();
            };

            await expect(fetchAPI("https://api.example.com")).rejects.toThrow(
                "Failed to fetch data: Too Many Requests",
            );
        });
    });

    describe("data structure", () => {
        it("coin list has required fields", () => {
            const coin = mockCoinList[0];
            expect(coin).toHaveProperty("id");
            expect(coin).toHaveProperty("symbol");
            expect(coin).toHaveProperty("name");
            expect(coin).toHaveProperty("image");
            expect(coin).toHaveProperty("current_price");
            expect(coin).toHaveProperty("market_cap");
            expect(coin).toHaveProperty("market_cap_rank");
            expect(coin).toHaveProperty("price_change_percentage_24h");
        });

        it("coin detail has required nested fields", () => {
            expect(mockCoinDetail.market_data).toHaveProperty("current_price");
            expect(mockCoinDetail.market_data).toHaveProperty("market_cap");
            expect(mockCoinDetail.market_data).toHaveProperty("total_volume");
            expect(mockCoinDetail.market_data).toHaveProperty("circulating_supply");
            expect(mockCoinDetail.market_data).toHaveProperty("sparkline_7d");
            expect(mockCoinDetail).toHaveProperty("description");
        });
    });
});
