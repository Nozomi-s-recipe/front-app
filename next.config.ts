import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    domains: ['images.microcms-assets.io'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.microcms-assets.io',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
