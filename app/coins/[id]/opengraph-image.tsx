import { ImageResponse } from "next/og";
import { getCoinDetail } from "@/lib/api";
import { formatCurrency } from "@/lib/utils";
import { SITE_NAME } from "@/lib/constants";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const coin = await getCoinDetail(id);

  if (!coin) {
    return new ImageResponse(
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          color: "#f8fafc",
          fontSize: 48,
          fontWeight: 700,
        }}
      >
        Coin Not Found
      </div>,
      { ...size },
    );
  }

  const coinImage =
    typeof coin.image === "string"
      ? coin.image
      : (coin.image as { large: string }).large;

  const price = formatCurrency(coin.market_data.current_price.usd);
  const change24h = coin.market_data.price_change_percentage_24h;
  const changeSign = change24h >= 0 ? "+" : "";
  const changeColor = change24h >= 0 ? "#34d399" : "#fb7185";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "60px 64px",
        background:
          "linear-gradient(145deg, #0c1222 0%, #162036 50%, #1a1a3e 100%)",
        fontFamily: "sans-serif",
        color: "#f8fafc",
      }}
    >
      {/* Top: Site branding */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          fontSize: 22,
          color: "#94a3b8",
          fontWeight: 600,
          letterSpacing: "0.5px",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042l-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893l-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042l.348-1.97M7.48 20.364l3.126-17.727" />
        </svg>
        {SITE_NAME}
      </div>

      {/* Middle: Coin info */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "48px",
        }}
      >
        {/* Coin logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "160px",
            height: "160px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
            border: "3px solid rgba(255,255,255,0.1)",
            flexShrink: 0,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={coinImage}
            width={120}
            height={120}
            alt=""
            style={{ borderRadius: "50%" }}
          />
        </div>

        {/* Text content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {/* Headline */}
          <div
            style={{
              display: "flex",
              fontSize: 56,
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-1px",
            }}
          >
            <span>{coin.name}</span>
            <span style={{ color: "#64748b", marginLeft: "12px" }}>
              ({coin.symbol.toUpperCase()})
            </span>
          </div>

          {/* Price + 24h change */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "16px",
              fontSize: 36,
              fontWeight: 700,
            }}
          >
            <span>{price}</span>
            <span
              style={{
                fontSize: 24,
                fontWeight: 600,
                color: changeColor,
                background:
                  change24h >= 0
                    ? "rgba(52,211,153,0.12)"
                    : "rgba(251,113,133,0.12)",
                padding: "4px 14px",
                borderRadius: "8px",
              }}
            >
              {`${changeSign}${change24h.toFixed(2)}%`}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom: CTA */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            fontSize: 22,
            fontWeight: 600,
            color: "#60a5fa",
            letterSpacing: "0.3px",
          }}
        >
          View Live Charts, Market Cap &amp; Trading Data →
        </div>
        <div
          style={{
            fontSize: 18,
            color: "#475569",
            fontWeight: 500,
          }}
        >
          Powered by CoinGecko
        </div>
      </div>
    </div>,
    { ...size },
  );
}
