/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        // Setiap request ke /api-backend akan diteruskan ke server asli
        source: '/api-backend/:path*',
        destination: 'https://acsa-backend.vercel.app/:path*', 
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'acsa-backend.vercel.app',
        pathname: '/**', // Mengizinkan semua gambar dari domain tersebut
      },
    ],
  },
};

export default nextConfig;