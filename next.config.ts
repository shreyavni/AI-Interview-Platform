import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    useCache: true,
  },
  serverActions: {
    allowedOrigins: ["localhost:3000", "*.devtunnels.ms"],
  },
  headers: async () => {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "x-forwarded-proto",
            value: "https",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
