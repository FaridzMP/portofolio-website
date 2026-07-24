/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/portofolio-website',
  images: {
    domains: ['github.com', 'avatars.githubusercontent.com'],
    unoptimized: true,
  },
}

module.exports = nextConfig
