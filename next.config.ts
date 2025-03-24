import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/storage/:path*",
        destination: "/api/storage/:path*",
      },
    ];
  },
};

export default nextConfig;
