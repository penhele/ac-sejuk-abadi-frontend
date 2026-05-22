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
    dangerouslyAllowLocalIP: true,
  },
};

export default nextConfig;
