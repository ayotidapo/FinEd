/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
<<<<<<< HEAD
    domains: [
      'money-africa-media-staging.s3.amazonaws.com',
      'money-africa-media-prod.s3.eu-west-1.amazonaws.com',
    ],
=======
    domains: ['money-africa-media-staging.s3.amazonaws.com','money-africa-media-prod.s3.amazonaws.com'],
>>>>>>> 449d359d037f00fe0f40249b75e52f6fd625dcbc
  },
  env: {
    FLUTTERWAVE_KEY: process.env.FLUTTERWAVE_KEY,
  },
};

module.exports = nextConfig;
