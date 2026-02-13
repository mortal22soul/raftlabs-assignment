import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";

export function Hero() {
  return (
    <section className="relative space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-24 overflow-hidden">
      <div className="container flex max-w-5xl flex-col items-center gap-4 text-center animate-fade-in relative z-10">
        <Badge
          variant="secondary"
          className="px-3 py-1.5 text-xs font-medium border border-border/50 bg-muted/30 rounded-full">
          <TrendingUp className="h-3.5 w-3.5 mr-1.5 text-primary" />
          <span className="text-foreground/90">Live</span> Market Data
        </Badge>

        <h1 className="font-heading text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-foreground">
          Real-time Crypto <br className="hidden sm:inline" />
          <span className="text-primary">Insights</span>
        </h1>

        <p className="max-w-2xl mx-auto leading-relaxed text-muted-foreground sm:text-lg sm:leading-8">
          Track the top 20 cryptocurrencies with server-side precision.{" "}
          <br className="hidden md:inline" />
          Lightning fast, SEO optimized, and beautiful by design.
        </p>

        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Link href="#market-table">
            <Button
              size="lg"
              className="rounded-full h-11 px-8 text-base bg-primary hover:bg-primary/90 text-primary-foreground">
              Explore Markets <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link
            href="https://github.com/mortal22soul/raftlabs-assignment"
            target="_blank">
            <Button
              variant="outline"
              size="lg"
              className="hover:cursor-pointer rounded-full h-11 px-8 text-base border-border/50 hover:bg-muted/50">
              View Source
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
