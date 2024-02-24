/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['test.alexfedorov.pro:8443/api'],
    domains: ['test.alexfedorov.pro'],
  },
};

module.exports = nextConfig;