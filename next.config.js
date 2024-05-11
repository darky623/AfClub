
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'app.rixyfit.ru/api',
      'api.rixyfit.ru/api',
      'callback4bot.alexfedorov.pro:8443',
      'callback4bot.alexfedorov.pro',
    ],
  },
};

module.exports = nextConfig;
