const nextConfig = {
  i18n: {
    locales: ["ru"],
    defaultLocale: "ru",
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;



