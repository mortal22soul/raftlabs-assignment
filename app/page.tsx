import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { getMarketData } from "@/lib/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SearchCommand } from "@/components/SearchCommand";
import { RefreshButton } from "@/components/RefreshButton";
import { formatCurrency, formatCompactNumber } from "@/lib/utils";

export default async function Dashboard() {
  // SSR Fetch (runs on every request because of cache: 'no-store' in api.ts)
  const coins = await getMarketData();

  // JSON-LD for WebSite
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "CryptoTracker",
    url: "https://crypto-tracker-raftlabs.vercel.app",
    potentialAction: {
      "@type": "SearchAction",
      target:
        "https://crypto-tracker-raftlabs.vercel.app/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <main className="flex flex-col items-center">
      <div className="container mx-auto py-10" id="market-table">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Market Overview
            </h2>
            <p className="text-muted-foreground">
              Live prices and performance for the top 20 assets.
            </p>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <SearchCommand coins={coins} />
            <RefreshButton />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b border-border/40">
                <TableHead className="w-16">Rank</TableHead>
                <TableHead>Asset</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">24h</TableHead>
                <TableHead className="text-right hidden md:table-cell">
                  Market Cap
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coins.map((coin) => (
                <TableRow key={coin.id} className="cursor-pointer">
                  <TableCell className="text-muted-foreground text-sm">
                    #{coin.market_cap_rank}
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/coins/${coin.id}`}
                      className="flex items-center gap-3 hover:opacity-70 transition-opacity"
                    >
                      <Image
                        src={coin.image}
                        alt={coin.name}
                        width={28}
                        height={28}
                        className="rounded-full"
                      />
                      <div>
                        <span className="font-semibold text-sm block">
                          {coin.name}
                        </span>
                        <span className="text-xs text-muted-foreground uppercase">
                          {coin.symbol}
                        </span>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm">
                    {formatCurrency(coin.current_price)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div
                      className={`flex items-center justify-end text-sm font-medium ${
                        coin.price_change_percentage_24h >= 0
                          ? "text-emerald-400"
                          : "text-rose-400"
                      }`}
                    >
                      {coin.price_change_percentage_24h >= 0 ? (
                        <ArrowUpRight className="mr-0.5 h-3.5 w-3.5" />
                      ) : (
                        <ArrowDownRight className="mr-0.5 h-3.5 w-3.5" />
                      )}
                      {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                    </div>
                  </TableCell>
                  <TableCell className="text-right hidden md:table-cell text-muted-foreground font-mono text-sm">
                    {formatCompactNumber(coin.market_cap)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
