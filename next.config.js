
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'testbot.alexfedorov.pro:8443',
      'callback4bot.alexfedorov.pro:8443',
      'testbot.alexfedorov.pro',
      'callback4bot.alexfedorov.pro',
      'test.alexfedorov.pro'
    ],
  },
};

module.exports = nextConfig;
