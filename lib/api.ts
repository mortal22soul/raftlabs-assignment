import { Coin, CoinDetail } from "@/types";

// Helper for consistent fetching with error handling
async function fetchAPI<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${process.env.BASE_URL}${endpoint}`, {
    cache: "no-store", // CRITICAL: This ensures fresh data on every request (SSR)
  });

  if (!res.ok) {
    // In production, you might want to log this error to a service like Sentry
    throw new Error(`Failed to fetch data: ${res.statusText}`);
  }

  return res.json();
}

// 1. Fetch the list of top 20 coins for the homepage
export const getMarketData = async (): Promise<Coin[]> => {
  return fetchAPI<Coin[]>(
    `/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true&x_cg_demo_api_key=${process.env.API_KEY}`,
  );
};

// 2. Fetch detailed data for a specific coin (Programmatic SEO Page)
export const getCoinDetail = async (id: string): Promise<CoinDetail> => {
  return fetchAPI<CoinDetail>(
    `/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true&x_cg_demo_api_key=${process.env.API_KEY}`,
  );
};
