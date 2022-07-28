const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA({
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
    ]
  },
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    dest: 'public',
    runtimeCaching,
  },
})
