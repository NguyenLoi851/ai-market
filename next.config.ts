import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  env: {
    POSTGRES_URL: process.env.NEXT_PUBLIC_POSTGRES_URL,
    POSTGRES_URL_NON_POOLING : process.env.NEXT_PUBLIC_POSTGRES_URL_NON_POOLING
  },
};

export default nextConfig;
