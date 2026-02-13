import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "standalone", // for docker
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "coin-images.coingecko.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
