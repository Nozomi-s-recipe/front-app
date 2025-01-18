import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  images: {
    minimumCacheTTL: 360, // キャッシュ時間を設定
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
