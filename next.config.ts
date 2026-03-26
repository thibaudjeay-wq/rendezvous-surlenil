import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
      // Images temporaires pour dev (Unsplash)
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // Redirections depuis l'ancien site
  async redirects() {
    return [
      // Adapter avec les vraies URLs de l'ancien site une fois reçues
      // { source: '/dahabiya', destination: '/croisieres-dahabiya', permanent: true },
      // { source: '/contact-us', destination: '/contact', permanent: true },
    ]
  },

  // Headers de sécurité + SEO
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ]
  },
}

export default nextConfig
