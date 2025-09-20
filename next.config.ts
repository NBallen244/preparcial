import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
        remotePatterns: [
          {
            protocol: 'https', // or 'http' if necessary
            hostname: '**', // This wildcard allows all hostnames
            port: '', // Leave empty for default ports
            pathname: '**', // This wildcard allows all paths
          },
        ],
      },
};

export default nextConfig;
