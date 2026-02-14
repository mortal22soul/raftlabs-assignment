# Keyword Research — CryptoTracker

## Approach

Used **Google Keyword Planner** and **Ubersuggest** to find relevant keywords around crypto price tracking. Started with seed terms like "crypto prices" and "bitcoin price", then expanded using related suggestions and search volume data.

---

## Homepage Keywords

| Keyword                  | ~Monthly Searches | Competition | Placement        |
| ------------------------ | ----------------- | ----------- | ---------------- |
| crypto prices            | 50K–100K          | High        | Title, H1        |
| cryptocurrency prices    | 30K–50K           | High        | Meta description |
| live crypto prices       | 10K–30K           | Medium      | H2, body content |
| crypto market cap        | 10K–30K           | Medium      | Table headers    |
| real-time cryptocurrency | 5K–10K            | Low         | Meta description |

---

## Coin Page Keywords

Each coin page targets `[coin name] + modifier`:

| Pattern            | Example              | ~Searches | Competition |
| ------------------ | -------------------- | --------- | ----------- |
| [coin] price       | bitcoin price        | 100K+     | High        |
| [coin] live price  | ethereum live price  | 50K+      | Medium      |
| [coin] market cap  | bitcoin market cap   | 30K+      | Medium      |
| [coin] price chart | ethereum price chart | 20K+      | Medium      |
| [coin] price today | bitcoin price today  | 50K+      | High        |

---

## On-Page Implementation

**Homepage (`/`)**

- Title: `CryptoTracker  - Real-time Crypto Prices & Market Insights`
- Meta: `Track live cryptocurrency prices, market charts, and historical data with our high-performance, server-side rendered dashboard.`
- H1: "Real-time Crypto Insights"

**Coin pages (`/coins/[id]`)**

- Title: `{Coin Name} ({SYMBOL}) Live Price, Charts & Market Cap`
- Meta: `{Coin Name} live price today is ${price}. View real-time {coin} charts, market cap, 24h trading volume, and price analysis.`
- H1: Coin name

Keyword density kept around 1–2% for primary terms — rest appear naturally through content.

---

## Search Intent

| Intent        | Example queries                     | Coverage                      |
| ------------- | ----------------------------------- | ----------------------------- |
| Navigational  | "bitcoin price", "ethereum tracker" | ✅ Covered by coin pages      |
| Informational | "what is bitcoin"                   | Partial — coin descriptions   |
| Commercial    | "best cryptocurrency"               | Not yet — potential expansion |
| Transactional | "buy bitcoin"                       | Out of scope                  |

---

## Status

- [x] Keyword research and volume analysis
- [x] Keywords in titles, meta descriptions, headings
- [x] Structured data includes relevant terms
- [ ] Set up Search Console tracking (post-deploy)
- [ ] Monitor and iterate monthly
