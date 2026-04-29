/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com", "api.dicebear.com"],
    unoptimized: true,
  },
};

module.exports = nextConfig;
