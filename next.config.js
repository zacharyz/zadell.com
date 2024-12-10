/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Required for GitHub Pages
  basePath: process.env.NODE_ENV === "production" ? "/repo-name" : "",
};

module.exports = nextConfig;
