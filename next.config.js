// next.config.js
module.exports = {
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: 'http://localhost:3000/api/:path*'
  //     }
  //   ]
  // },
  async headers() {
    return [
      {
        source: "/api/(*)",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "https://math-fact-missions.herokuapp.com" },
        ]
      }
    ]
  }
}