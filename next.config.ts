import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    domains: ['images.microcms-assets.io'],
    // microCMSの画像は既に最適化されているので、Next.jsの最適化を最小限に
    minimumCacheTTL: 31536000, // 1年間キャッシュ
    unoptimized: true, // Next.jsの画像最適化を無効化
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
