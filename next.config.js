/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: '/h',
  images: {
    // domains: ['mupra.ir','aribaceramic.ir','mupra.me'],
    remotePatterns: [
      {
        // protocol: "https",
        hostname: "**",
      },
      // {
      //   protocol: "http",
      //   hostname: "**",
      // },
    ],
  },
}

module.exports = nextConfig
