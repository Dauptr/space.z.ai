import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['z-cdn.chatglm.cn'],
  },
}

export default nextConfig
