/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NODE_ENV === 'production' ? 'https://bfab.vercel.app/formula' : 'http://localhost:3001/formula',
  },
}

module.exports = nextConfig
