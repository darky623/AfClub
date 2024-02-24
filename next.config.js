
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'test.alexfedorov.pro:8443',
      'callback4bot.alexfedorov.pro',
      'test.alexfedorov.pro',
    ],
  },
};

module.exports = nextConfig;