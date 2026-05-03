import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "serves.m-loeffler.de",
        port: "",
        pathname: "/pics/fdp/**",
      },
      {
        // Instagram CDN — covers scontent-*.cdninstagram.com
        protocol: "https",
        hostname: "**.cdninstagram.com",
      },
      {
        // Instagram CDN fallback (fbcdn.net)
        protocol: "https",
        hostname: "**.fbcdn.net",
      },
    ]
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
