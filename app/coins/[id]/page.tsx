import { getCoinDetail } from "@/lib/api";
import { notFound } from "next/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Metadata } from "next";
import { formatCurrency, formatCompactNumber } from "@/lib/utils";

// Dynamic import for PriceChart to reduce initial bundle size
const PriceChart = dynamic(() => import("@/components/charts/PriceChart"), {
  loading: () => (
    <div className="h-[350px] w-full flex items-center justify-center">
      <div className="animate-pulse text-muted-foreground text-sm">
        Loading chart...
      </div>
    </div>
  ),
});

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
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 space-y-6">
      {/* HEADER: Identity & Rank */}
      <div className="flex items-center gap-3 sm:gap-4">
        <Image
          src={
            typeof coin.image === "string"
              ? coin.image
              : (coin.image as { large: string }).large
          }
          alt={coin.name}
          width={56}
          height={56}
          className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 rounded-full"
        />
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold truncate">
            {coin.name}
          </h1>
          <div className="flex gap-2 mt-1.5 sm:mt-2 flex-wrap">
            <Badge variant="secondary" className="uppercase font-bold text-xs">
              {coin.symbol}
            </Badge>
            <Badge variant="outline" className="text-xs">
              Rank #{coin.market_cap_rank}
            </Badge>
          </div>
        </div>
      </div>

      {/* GRID LAYOUT */}
      <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
        {/* CHART CARD (Spans 2 columns) */}
        <Card className="md:col-span-2">
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="text-lg sm:text-xl">
              Price Performance (7d)
            </CardTitle>
            <CardDescription className="text-sm">
              Current Price:{" "}
              <span className="font-mono text-foreground font-bold text-base sm:text-lg">
                {formatCurrency(coin.market_data.current_price.usd)}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-0 pr-4 sm:pr-6">
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
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="text-lg sm:text-xl">Market Stats</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:gap-4">
            <div className="flex justify-between items-center border-b border-border/50 pb-2">
              <span className="text-xs sm:text-sm text-muted-foreground">
                Market Cap
              </span>
              <span className="font-mono font-medium text-xs sm:text-sm truncate ml-2">
                {formatCurrency(coin.market_data.market_cap.usd)}
              </span>
            </div>
            <div className="flex justify-between items-center border-b border-border/50 pb-2">
              <span className="text-xs sm:text-sm text-muted-foreground">
                24h High
              </span>
              <span className="font-mono font-medium text-emerald-400 text-xs sm:text-sm">
                {formatCurrency(coin.market_data.high_24h.usd)}
              </span>
            </div>
            <div className="flex justify-between items-center border-b border-border/50 pb-2">
              <span className="text-xs sm:text-sm text-muted-foreground">
                24h Low
              </span>
              <span className="font-mono font-medium text-rose-400 text-xs sm:text-sm">
                {formatCurrency(coin.market_data.low_24h.usd)}
              </span>
            </div>
            <div className="flex justify-between items-center border-b border-border/50 pb-2">
              <span className="text-xs sm:text-sm text-muted-foreground">
                Volume (24h)
              </span>
              <span className="font-mono font-medium text-xs sm:text-sm truncate ml-2">
                {formatCompactNumber(coin.market_data.total_volume.usd)}
              </span>
            </div>
            <div className="flex justify-between items-center pb-2">
              <span className="text-xs sm:text-sm text-muted-foreground">
                Circulating Supply
              </span>
              <span className="font-mono font-medium text-xs sm:text-sm truncate ml-2">
                {formatCompactNumber(coin.market_data.circulating_supply)}{" "}
                {coin.symbol.toUpperCase()}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* DESCRIPTION CARD (Critical for SEO Content Depth) */}
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="text-lg sm:text-xl">
            About {coin.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="prose prose-sm sm:prose prose-slate dark:prose-invert max-w-none text-muted-foreground [&_a]:text-primary [&_a]:no-underline hover:[&_a]:underline"
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
