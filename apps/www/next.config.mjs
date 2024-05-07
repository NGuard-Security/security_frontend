import i18nConfig from "./next-i18next.config.js"

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: i18nConfig.i18n,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.nguard.dev",
      },
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
      },
      // For development
      {
        protocol: "https",
        hostname: "nguard-cdn-v3staging.onrender.com",
      },
    ],
  },
  reactStrictMode: true,
  transpilePackages: ["@packages/ui"],
}

export default nextConfig
