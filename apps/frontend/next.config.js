/** @type {import('next').NextConfig} */
const withPlugins = require('next-compose-plugins')
const withTM = require('next-transpile-modules')(['three'])
const nextConfig = {
  env: {
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NX_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NX_SANITY_DATASET,
    SANITY_API_TOKEN: process.env.NX_SANITY_API_TOKEN,
  },
  reactStrictMode: true,
}

module.exports = withPlugins([withTM], nextConfig)
