module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: 'http://localhost:3333/api/v1/:path*'
      }
    ]
  }
}
