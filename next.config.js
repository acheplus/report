module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: 'http://acheplusreport-env.eba-rynbyimh.sa-east-1.elasticbeanstalk.com/api/v1/:path*'
        //destination: 'http://localhost:5000/api/v1/:path*'
      }
    ]
  }
}
