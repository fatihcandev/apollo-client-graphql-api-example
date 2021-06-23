const path = require('path')

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['media.discordapp.net'],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      components: path.resolve(__dirname, 'components/'),
      styles: path.resolve(__dirname, 'styles/'),
      '@/graphql': path.resolve(__dirname, 'graphql/'),
    }
    return config
  },
}
