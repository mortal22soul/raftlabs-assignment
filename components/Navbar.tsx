"use client";

import Link from "next/link";
import { Monitor, Menu, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  return (
    <header className="sticky px-10 top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Monitor className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              CryptoTracker
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="https://github.com/mortal22soul/"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
          </nav>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <div className="px-7">
              <Link href="/" className="flex items-center">
                <Monitor className="mr-2 h-4 w-4" />
                <span className="font-bold">CryptoTracker</span>
              </Link>
            </div>
            <nav className="flex flex-col gap-4 px-7 mt-8 text-sm font-medium">
              <Link
                href="https://github.com/mortal22soul/"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-foreground/80 text-foreground/60 flex items-center gap-2"
              >
                <Github className="h-4 w-4" />
                GitHub
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none"></div>
        </div>
      </div>
    </header>
  );
}
