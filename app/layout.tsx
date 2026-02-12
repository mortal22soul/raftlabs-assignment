import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: {
    default: "CryptoTracker - Real-time Crypto Prices & Market Insights",
    template: "%s | CryptoTracker",
  },
  description:
    "Track live cryptocurrency prices, market charts, and historical data with our high-performance, server-side rendered dashboard.",
  metadataBase: new URL("https://raftlabs-assignment-sage.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://raftlabs-assignment-sage.vercel.app",
    title: "CryptoTracker",
    description: "Real-time Crypto Prices & Market Insights",
    siteName: "CryptoTracker",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
