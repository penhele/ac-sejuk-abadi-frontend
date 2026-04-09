/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        // Sekarang /api-backend akan diteruskan ke localhost
        source: '/api-backend/:path*',
        destination: 'http://localhost:3000/:path*', 
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        // Mengizinkan Next.js menampilkan gambar yang di-host di server lokal
        protocol: 'http',
        hostname: 'localhost',
        port: '3000', // Sesuaikan dengan port backend kamu
        pathname: '/**', 
      },
    ],
  },
};

export default nextConfig;