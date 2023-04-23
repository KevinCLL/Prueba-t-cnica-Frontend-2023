/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  runtime: 'nodejs',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.mzstatic.com',
        port: '',
        pathname: '/image/**',
      }
    ]
  }
}

module.exports = nextConfig
