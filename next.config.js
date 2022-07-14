/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['money-africa-media-staging.s3.amazonaws.com'],
  },
};

module.exports = nextConfig;
