// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client", "prisma"],
    outputFileTracingIncludes: {
      "/api/**/*": ["./node_modules/.prisma/client/**/*"],
      "/*": ["./node_modules/.prisma/client/**/*"],
    },
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [  // Only match if host is non-www
          {
            type: 'header',
            key: 'host',
            value: 'chesseasy.com',  // Your non-www domain
          },
        ],
        destination: 'https://www.chesseasy.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;