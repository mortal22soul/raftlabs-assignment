"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Search, TrendingUp, ArrowUpRight } from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Coin } from "@/types";
import { formatCurrency } from "@/lib/utils";

interface SearchCommandProps {
  coins: Coin[];
}

export function SearchCommand({ coins }: SearchCommandProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className="relative h-10 w-full justify-start rounded-lg bg-muted/50 text-sm font-normal text-muted-foreground shadow-none hover:bg-muted/80 transition-colors border-border/50 sm:pr-12 md:w-48 lg:w-72"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4 shrink-0" />
        <span className="hidden lg:inline-flex">
          Search cryptocurrencies...
        </span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-2 top-2 hidden h-6 select-none items-center gap-0.5 rounded border border-border/50 bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search by name or symbol..." />
        <CommandList>
          <CommandEmpty>
            <div className="py-6 text-center">
              <p className="text-sm text-muted-foreground">
                No cryptocurrencies found.
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Try searching for Bitcoin, Ethereum, or another coin.
              </p>
            </div>
          </CommandEmpty>
          <CommandGroup heading="Quick Actions">
            <CommandItem
              onSelect={() => runCommand(() => router.push("/"))}
              className="cursor-pointer"
            >
              <TrendingUp className="mr-3 h-4 w-4 text-muted-foreground" />
              <span className="font-medium">View Market Overview</span>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Top Cryptocurrencies">
            {coins.map((coin) => (
              <CommandItem
                key={coin.id}
                onSelect={() =>
                  runCommand(() => router.push(`/coins/${coin.id}`))
                }
                value={`${coin.name} ${coin.symbol}`}
                className="cursor-pointer"
              >
                <div className="flex items-center gap-3 w-full py-1">
                  <Image
                    src={coin.image}
                    alt={coin.name}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{coin.name}</span>
                      <span className="text-xs text-muted-foreground uppercase font-mono">
                        {coin.symbol}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs font-mono text-muted-foreground">
                        {formatCurrency(coin.current_price)}
                      </span>
                      <span
                        className={`text-xs font-medium flex items-center ${
                          coin.price_change_percentage_24h >= 0
                            ? "text-emerald-400"
                            : "text-rose-400"
                        }`}
                      >
                        {coin.price_change_percentage_24h >= 0 ? "+" : ""}
                        {coin.price_change_percentage_24h.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground/50 shrink-0" />
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
