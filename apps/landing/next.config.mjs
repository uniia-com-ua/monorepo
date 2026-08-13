import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  transpilePackages: ["@workspace/ui", "@workspace/strapi", "@workspace/strapi-types"],
  images: {
    localPatterns: [
      {
        pathname: "/api/cms-media/**",
      },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms.uniia.com.ua",
      },
      {
        protocol: "https",
        hostname: "cms-test.uniia.com.ua",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin("./src/lib/i18n/request.ts");

export default withNextIntl(nextConfig);
