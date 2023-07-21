/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['via.placeholder.com', 'localhost'],
  },
  env:{
    API_SERVER: 'http://localhost:3002'
  }
  // avoid cors with proxy
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: 'http://localhost:3005/:path*', // Proxy to Backend
  //     },
  //   ]
  // },

  // reactStrictMode: true,

  // images: {
  //   loader: 'akamai',
  //   path: '',
  // },

  // basePath: '/next-test',
  // assetPrefix: '/next-test',

}

module.exports = nextConfig
