/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  transpilePackages: ["@workspace/ui", "@workspace/strapi"],
  images: {
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
}

export default nextConfig
