// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:*',
        destination: 'http://localhost:3000/*'
      }
    ]
  },
  async headers() {
    return [
      {
        source: '/api/:*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Origin, X-Requested-With, Content-Type, Accept',
          },
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true',
          },
        ],
      },
    ]
  }
}