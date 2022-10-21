// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: 'https://math-fact-missions.herokuapp.com/api/:path*',
        destination: 'http://localhost:3000/api/:path*'
      }
    ]
  },
  // async headers() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       headers: [
  //         {
  //           key: 'Access-Control-Allow-Origin',
  //           value: '*',
  //         },
  //         {
  //           key: 'Access-Control-Allow-Headers',
  //           value: 'Origin, X-Requested-With, Content-Type, Accept',
  //         },
  //         {
  //           key: 'Access-Control-Allow-Credentials',
  //           value: 'true',
  //         },
  //       ],
  //     },
  //   ]
  // }
}