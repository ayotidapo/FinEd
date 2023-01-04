/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['money-africa-media-staging.s3.amazonaws.com','money-africa-media-prod.s3.amazonaws.com'],
  },
  env: {
    FLUTTERWAVE_KEY: process.env.FLUTTERWAVE_KEY,
  },
};

module.exports = nextConfig;
