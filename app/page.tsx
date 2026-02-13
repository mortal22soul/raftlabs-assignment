import Link from "next/link";
import Image from "next/image";
import { getMarketData } from "@/lib/api";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { SearchCommand } from "@/components/SearchCommand";
import { RefreshButton } from "@/components/RefreshButton";
import { formatCurrency, formatCompactNumber } from "@/lib/utils";
import { Hero } from "@/components/Hero";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function Dashboard() {
  const coins = await getMarketData();

  // JSON-LD Structured Data
  const siteUrl = "https://raftlabs-assignment-sage.vercel.app";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "CryptoTracker",
        url: siteUrl,
        description:
          "Track live cryptocurrency prices, market caps, and 24h performance for the top digital assets.",
      },
      {
        "@type": "CollectionPage",
        name: "Market Overview — Top Cryptocurrencies by Market Cap",
        description:
          "Live prices and performance for the top 20 cryptocurrency assets.",
        url: siteUrl,
        isPartOf: {
          "@type": "WebSite",
          name: "CryptoTracker",
          url: siteUrl,
        },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: coins.length,
          itemListElement: coins.slice(0, 10).map((coin, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: coin.name,
            url: `${siteUrl}/coins/${coin.id}`,
          })),
        },
      },
    ],
  };

  return (
    <main className="flex flex-col items-center w-full">
      <Hero />
      <div
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10"
        id="market-table">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="w-full md:w-auto">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Market Overview
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              Live prices and performance for the top 20 assets.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <SearchCommand coins={coins} />
            <RefreshButton />
          </div>
        </div>

        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-b border-border/40">
                    <TableHead className="w-12 sm:w-16 pl-4 sm:pl-4">
                      Rank
                    </TableHead>
                    <TableHead className="min-w-35">Asset</TableHead>
                    <TableHead className="text-right min-w-20">Price</TableHead>
                    <TableHead className="text-right min-w-17.5">24h</TableHead>
                    <TableHead className="text-right hidden md:table-cell min-w-25 pr-4">
                      Market Cap
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {coins.map((coin) => (
                    <TableRow key={coin.id} className="cursor-pointer">
                      <TableCell className="text-muted-foreground text-xs sm:text-sm pl-4 sm:pl-4">
                        #{coin.market_cap_rank}
                      </TableCell>
                      <TableCell className="min-w-35">
                        <Link
                          href={`/coins/${coin.id}`}
                          className="flex items-center gap-2 sm:gap-3 hover:opacity-70 transition-opacity">
                          <Image
                            src={coin.image}
                            alt={coin.name}
                            width={24}
                            height={24}
                            className="rounded-full sm:w-7 sm:h-7"
                          />
                          <div className="min-w-0">
                            <span className="font-semibold text-xs sm:text-sm block truncate">
                              {coin.name}
                            </span>
                            <span className="text-[10px] sm:text-xs text-muted-foreground uppercase">
                              {coin.symbol}
                            </span>
                          </div>
                        </Link>
                      </TableCell>
                      <TableCell className="text-right font-mono text-xs sm:text-sm whitespace-nowrap">
                        {formatCurrency(coin.current_price)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div
                          className={`flex items-center justify-end text-xs sm:text-sm font-medium ${coin.price_change_percentage_24h >= 0
                            ? "text-emerald-400"
                            : "text-rose-400"
                            }`}>
                          {coin.price_change_percentage_24h >= 0 ? (
                            <ArrowUpRight className="mr-0.5 h-3 w-3 sm:h-3.5 sm:w-3.5" />
                          ) : (
                            <ArrowDownRight className="mr-0.5 h-3 w-3 sm:h-3.5 sm:w-3.5" />
                          )}
                          <span className="whitespace-nowrap">
                            {Math.abs(coin.price_change_percentage_24h).toFixed(
                              2,
                            )}
                            %
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right hidden md:table-cell text-muted-foreground font-mono text-sm pr-4 whitespace-nowrap">
                        {formatCompactNumber(coin.market_cap)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
