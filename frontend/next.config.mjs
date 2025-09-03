/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3007/api/:path*',
      },
      {
        source: '/uploads/:path*',
        destination: 'http://localhost:3007/uploads/:path*',
      },
    ];
  },
};

export default nextConfig;
