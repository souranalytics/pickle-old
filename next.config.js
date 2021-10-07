/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,

  async redirects() {
    return [
      {
        destination: 'https://alizahid0.typeform.com/to/jQ038g85',
        permanent: false,
        source: '/contact'
      }
    ]
  },
  async rewrites() {
    return [
      {
        destination: '/api/users',
        source: '/api/identify'
      }
    ]
  }
}
