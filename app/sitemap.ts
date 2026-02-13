import { MetadataRoute } from "next";
import { getMarketData } from "@/lib/api";
import { SITE_URL } from "@/lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_URL;

  // 1. Static Routes
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
  ];

  // 2. Dynamic Routes (Coins)
  const coins = await getMarketData();
  const coinRoutes = coins.map((coin) => ({
    url: `${baseUrl}/coins/${coin.id}`,
    lastModified: new Date(coin.last_updated),
    changeFrequency: "always" as const, // Crypto prices change constantly
    priority: 0.8,
  }));

  return [...routes, ...coinRoutes];
}
