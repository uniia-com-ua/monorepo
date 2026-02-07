/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui", "@workspace/strapi"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms.uniia.com.ua",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
}

export default nextConfig
