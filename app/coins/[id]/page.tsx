import { getCoinDetail } from "@/lib/api";
import { notFound } from "next/navigation";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PriceChart from "@/components/charts/PriceChart";
import { Metadata } from "next";
import { formatCurrency, formatCompactNumber } from "@/lib/utils";

// Dynamic Metadata Generation for Programmatic SEO
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = await params;
  const coin = await getCoinDetail(id);

  if (!coin) {
    return {
      title: "Coin Not Found | CryptoTracker",
      description:
        "The requested cryptocurrency information could not be found.",
    };
  }

  const name = coin.name;
  const price = formatCurrency(coin.market_data.current_price.usd);

  return {
    title: `${name} (${coin.symbol.toUpperCase()}) Live Price, Charts & Market Cap`,
    description: `Stay updated with the latest ${name} price, which is currently ${price}. View historical charts, market capitalization, and detailed project information.`,
    alternates: {
      canonical: `https://raftlabs-assignment-sage.vercel.app/coins/${id}`,
    },
    openGraph: {
      title: `${name} Live Price & Analysis`,
      description: `Current ${name} market stats and 7-day performance chart.`,
      images: [
        {
          url:
            typeof coin.image === "string"
              ? coin.image
              : (coin.image as { large: string }).large,
          width: 400,
          height: 400,
          alt: `${name} logo`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} Price Update`,
      description: `Check out the latest stats for ${name}.`,
      images: [
        typeof coin.image === "string"
          ? coin.image
          : (coin.image as { large: string }).large,
      ],
    },
  };
}

export default async function CoinPage({ params }: { params: { id: string } }) {
  // 1. Fetch Data (SSR)
  const { id } = await params;
  const coin = await getCoinDetail(id);

  // 2. Handle 404s
  if (!coin) {
    notFound();
  }

  // Create the JSON-LD object (FinancialProduct + FAQPage for richness)
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "FinancialProduct",
      name: coin.name,
      description: coin.description.en.split(".")[0] + ".", // First sentence for clarity
      image:
        typeof coin.image === "string"
          ? coin.image
          : (coin.image as { large: string }).large,
      brand: {
        "@type": "Brand",
        name: "CryptoTracker",
      },
      offers: {
        "@type": "Offer",
        price: coin.market_data.current_price.usd,
        priceCurrency: "USD",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: `What is the current price of ${coin.name}?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `The current price of ${coin.name} is ${formatCurrency(
              coin.market_data.current_price.usd,
            )}.`,
          },
        },
        {
          "@type": "Question",
          name: `What is the market cap of ${coin.name}?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `The market capitalization of ${coin.name} is currently ${formatCurrency(
              coin.market_data.market_cap.usd,
            )}.`,
          },
        },
      ],
    },
  ];

  return (
    <main className="container mx-auto py-10 space-y-6">
      {/* HEADER: Identity & Rank */}
      <div className="flex items-center gap-4">
        <Image
          src={
            typeof coin.image === "string"
              ? coin.image
              : (coin.image as { large: string }).large
          }
          alt={coin.name}
          width={64}
          height={64}
          className="h-16 w-16 rounded-full"
        />
        <div>
          <h1 className="text-4xl font-bold">{coin.name}</h1>
          <div className="flex gap-2 mt-2">
            <Badge variant="secondary" className="uppercase font-bold">
              {coin.symbol}
            </Badge>
            <Badge variant="outline">Rank #{coin.market_cap_rank}</Badge>
          </div>
        </div>
      </div>

      {/* GRID LAYOUT */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* CHART CARD (Spans 2 columns) */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Price Performance (7d)</CardTitle>
            <CardDescription>
              Current Price:{" "}
              <span className="font-mono text-foreground font-bold text-lg">
                {formatCurrency(coin.market_data.current_price.usd)}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-0">
            {/* Client-Side Chart Component */}
            <PriceChart
              data={coin.market_data.sparkline_7d.price}
              color={
                coin.market_data.price_change_percentage_24h >= 0
                  ? "#34d399"
                  : "#fb7185"
              }
            />
          </CardContent>
        </Card>

        {/* STATS CARD (Spans 1 column) */}
        <Card>
          <CardHeader>
            <CardTitle>Market Stats</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-muted-foreground">Market Cap</span>
              <span className="font-mono font-medium">
                {formatCurrency(coin.market_data.market_cap.usd)}
              </span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-muted-foreground">24h High</span>
              <span className="font-mono font-medium text-emerald-400">
                {formatCurrency(coin.market_data.high_24h.usd)}
              </span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-muted-foreground">24h Low</span>
              <span className="font-mono font-medium text-rose-400">
                {formatCurrency(coin.market_data.low_24h.usd)}
              </span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-muted-foreground">Volume (24h)</span>
              <span className="font-mono font-medium">
                {formatCompactNumber(coin.market_data.total_volume.usd)}
              </span>
            </div>
            <div className="flex justify-between items-center pb-2">
              <span className="text-muted-foreground">Circulating Supply</span>
              <span className="font-mono font-medium">
                {formatCompactNumber(coin.market_data.circulating_supply)}{" "}
                {coin.symbol.toUpperCase()}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* DESCRIPTION CARD (Critical for SEO Content Depth) */}
      <Card>
        <CardHeader>
          <CardTitle>About {coin.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="prose prose-slate dark:prose-invert max-w-none text-muted-foreground"
            // We use dangerouslySetInnerHTML because the API returns HTML links
            dangerouslySetInnerHTML={{
              __html: coin.description.en || "No description available.",
            }}
          />
        </CardContent>
      </Card>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
