/** @type {import('next').NextConfig} */
const withPlugins = require('next-compose-plugins')
const withTM = require('next-transpile-modules')(['three'])
const nextConfig = {
  env: {
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET: process.env.SANITY_DATASET,
    SANITY_API_TOKEN: process.env.SANITY_API_TOKEN,
    FULL_PAGE_KEY: process.env.FULL_PAGE_KEY,
    NEXT_PUBLIC_FORM_ID: process.env.NEXT_PUBLIC_FORM_ID,
  },
  reactStrictMode: true,
}

module.exports = withPlugins([withTM], nextConfig)
