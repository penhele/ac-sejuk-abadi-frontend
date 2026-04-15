/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api-backend/:path*',
        destination: 'http://localhost:3000/:path*', 
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**', 
      },
    ],
  },
};

export default nextConfig;