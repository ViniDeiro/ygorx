/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['example.com'],
  },
  output: 'export',
  basePath: '/ygorx',
}

module.exports = nextConfig 