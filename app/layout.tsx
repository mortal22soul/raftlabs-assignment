import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  CREATOR,
} from "@/lib/constants";

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
  applicationName: SITE_NAME,

  referrer: "origin-when-cross-origin",

  creator: CREATOR,

  title: {
    default: `${SITE_NAME} - Real-time Crypto Prices and Market Insights`,
    template: `%s | ${SITE_NAME}`,
  },

  description: SITE_DESCRIPTION,

  metadataBase: new URL(SITE_URL),

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
    siteName: SITE_NAME,
    title: `${SITE_NAME} - Real-time Crypto Prices and Market Insights`,
    description: SITE_DESCRIPTION,
  },

  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} - Real-time Crypto Prices and Market Insights`,
    description: SITE_DESCRIPTION,
  },

  verification: {
    google: "_uWF6CDqz6aR_Ajx0cN0KhPh-i4orjCa9lu_hKYEvg0",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
