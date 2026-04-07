/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api-backend/:path*',
        destination: 'https://acsa-backend.vercel.app/:path*',
      },
    ];
  },
};

export default nextConfig;