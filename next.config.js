/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        destination: '/api/users',
        source: '/api/identify'
      }
    ]
  }
}
