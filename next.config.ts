import type { NextConfig } from "next";
const { withPlausibleProxy } = require('next-plausible');

const nextConfig: NextConfig = withPlausibleProxy()({
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

  async redirects() {
    return [
      {
        source: '/ig',
        destination: '/?utm_source=instagram&utm_medium=social&utm_campaign=launch',
        permanent: false,
      },
      {
        source: '/tt',
        destination: '/?utm_source=tiktok&utm_medium=social&utm_campaign=launch',
        permanent: false,
      },
      {
        source: '/fb',
        destination: '/?utm_source=facebook&utm_medium=social&utm_campaign=launch',
        permanent: false,
      },
      {
        source: '/yt',
        destination: '/?utm_source=youtube&utm_medium=social&utm_campaign=launch',
        permanent: false,
      }
    ]
  },
});

export default nextConfig;
