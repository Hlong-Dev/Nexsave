/** @type {import('next').NextConfig} */
const withNextIntl = require("next-intl/plugin")();

const nextConfig = withNextIntl({
  images: {
    domains: ["files.edgestore.dev"],
  },
});

module.exports = nextConfig;
