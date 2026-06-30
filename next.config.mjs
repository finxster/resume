/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'out',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
//  basePath: '/resume',
//  assetPrefix: '/resume/',
  trailingSlash: true,
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: ['**/out/**', '**/node_modules/**'],
      };
    }
    return config;
  },
};

export default nextConfig;

