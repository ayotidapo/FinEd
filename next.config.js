/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['s3.amazonaws.com'],
  },
  env: {
    FLUTTERWAVE_KEY: process.env.FLUTTERWAVE_KEY,
  },
};

module.exports = nextConfig;
