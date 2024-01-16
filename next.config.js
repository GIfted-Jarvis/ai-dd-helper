/** @type {import('next').NextConfig} */
const nextConfig = {
  publicRuntimeConfig: {
    OPENAI_BASE_URL: process.env.OPENAI_BASE_URL,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    MODEL: process.env.MODEL,
  },
};

module.exports = nextConfig;
