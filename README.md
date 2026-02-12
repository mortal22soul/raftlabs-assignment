# CryptoTracker - Programmatic SEO & SSR Dashboard

A high-performance, SEO-optimized cryptocurrency dashboard built with **Next.js 16**, **Shadcn UI**, and **Tailwind CSS**. This project demonstrates advanced Server-Side Rendering (SSR) patterns and Programmatic SEO best practices.

## 🚀 Live Demo

https://raftlabs-assignment-sage.vercel.app/

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS + Shadcn UI
- **Data Source**: CoinGecko API
- **Charts**: Recharts
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📑 Features

- **Real-time SSR**: Utilizes `cache: 'no-store'` for all data fetching to ensure users always see the latest market prices, satisfying the requirement for Server-Side Rendering.
- **Programmatic SEO**: Automatically generates unique pages for the top 20 cryptocurrencies.
- **Dynamic Metadata**: Each coin page features custom title tags and meta descriptions generated on-the-fly.
- **Structured Data**: Implements JSON-LD (FinancialProduct schema) to enable Google Rich Snippets.
- **Responsive Design**: Fully mobile-optimized dashboard using Shadcn UI's grid and table systems.
- **UX Polish**: Includes Skeleton loaders for smooth data transition and global error boundaries.

## 📈 SEO Implementation

- **JSON-LD**: Structured data is injected into every dynamic route to help search engines understand the financial context of the page.
- **OpenGraph**: Custom OG tags are implemented to ensure rich previews when sharing coin links on social media.
- **SSR Justification**: SSR was chosen over SSG because cryptocurrency prices are highly volatile; static generation would result in stale data.

## 🏁 Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/mortal22soul/raftlabs-assignment
   ```

2. **Install dependencies:**

```bash
pnpm install

```

1. **Run the development server:**

```bash
pnpm dev

```

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) to see the result.

## 🧠 Architectural Decisions

- **Root Directory Structure**: Opted for a root-level `app/` directory to maximize visibility and simplify imports.
- **Client vs. Server Components**: Kept the majority of the application as Server Components for performance, isolating only the charting logic (`PriceChart.tsx`) as a Client Component.

- **3. Run the git commands:**

```bash
git add .
git commit -m "docs: add comprehensive readme with architectural and seo documentation"

```
