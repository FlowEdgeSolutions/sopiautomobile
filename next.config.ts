import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      rules: {
        '*.ico': {
          loaders: ['@vercel/webpack-asset-relocator-loader'],
        },
      },
    },
  },
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
  },
};

export default nextConfig;
