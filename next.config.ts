import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  env: {
    POSTGRES_URL: process.env.NEXT_PUBLIC_POSTGRES_URL,
    POSTGRES_URL_NON_POOLING : process.env.NEXT_PUBLIC_POSTGRES_URL_NON_POOLING,

    MODEL_CHAT_URL : process.env.NEXT_PUBLIC_MODEL_CHAT_URL,
    MODEL_AUTH_TOKEN : process.env.NEXT_PUBLIC_MODEL_AUTH_TOKEN,
    MODEL_NAME: process.env.NEXT_MODEL_NAME
  },
};

export default nextConfig;
