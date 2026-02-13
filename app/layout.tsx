import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#111827",
};

export const metadata: Metadata = {
  applicationName: "CryptoTracker",

  referrer: "origin-when-cross-origin",

  creator: "Aryan",

  title: {
    default: "CryptoTracker - Real-time Crypto Prices & Market Insights",
    template: "%s | CryptoTracker",
  },

  description:
    "Track live cryptocurrency prices, market charts, and historical data with our high-performance, server-side rendered dashboard.",

  alternates: {
    canonical: "/",
  },

  manifest: "/site.webmanifest",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "CryptoTracker",
    title: "CryptoTracker - Real-time Crypto Prices & Market Insights",
    description:
      "Track live cryptocurrency prices, market charts, and historical data in real time.",
  },

  twitter: {
    card: "summary_large_image",
    title: "CryptoTracker - Real-time Crypto Prices & Market Insights",
    description:
      "Track live cryptocurrency prices, market charts, and historical data in real time.",
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
