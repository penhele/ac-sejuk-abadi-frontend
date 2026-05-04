import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zxwnjqtebeuxtftstnar.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/api/proxy/:path*",
        destination: "https://acsa-backend.vercel.app/api/:path*",
      },
    ];
  },
};

export default nextConfig;
