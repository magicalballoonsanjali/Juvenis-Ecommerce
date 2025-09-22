/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '**',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverComponentsExternalPackages: ['styled-jsx', 'inngest', 'mongoose'],
  },
  webpack(config) {
    config.module.exprContextCritical = false;
    return config;
  },
};

module.exports = nextConfig; // CommonJS export
