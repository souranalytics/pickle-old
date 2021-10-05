/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ['kousttopufrewjfhpsmg.supabase.in']
  },
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
