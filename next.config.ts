import type { NextConfig } from "next";
const { withPlausibleProxy } = require('next-plausible');

const nextConfig: NextConfig = {
  /* config options here */

  async headers() {
    return [
      {
        source: '/.well-known/apple-app-site-association',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/json',
          },
        ],
      },
    ];
  },

};

export default nextConfig;
