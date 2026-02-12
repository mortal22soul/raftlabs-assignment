export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  last_updated: string;
  sparkline_in_7d?: {
    price: number[];
  };
}

export interface CoinDetail {
  id: string;
  symbol: string;
  name: string;
  image: string | { large: string; small: string; thumb: string };
  description: { en: string };
  links: { homepage: string[] };
  genesis_date: string;
  market_cap_rank: number;
  last_updated: string;
  market_data: {
    current_price: { usd: number };
    market_cap: { usd: number };
    total_volume: { usd: number };
    circulating_supply: number;
    price_change_percentage_24h: number;
    high_24h: { usd: number };
    low_24h: { usd: number };
    sparkline_7d: { price: number[] };
  };
}
