
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'testbot.alexfedorov.pro:8443',
      'callback4bot.alexfedorov.pro:8443',
    ],
  },
};

module.exports = nextConfig;
