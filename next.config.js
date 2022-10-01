module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['i.ytimg.com'],
  },
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/videos',
        permanent: true,
      },
      {
        source: '/home',
        destination: '/videos',
        permanent: true,
      },
    ]
  },
  experimental: {
    scrollRestoration: true,
  },
}
