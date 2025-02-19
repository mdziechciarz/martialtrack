/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['i.pravatar.cc', 'sknfkmeegiifuratwiqi.supabase.co'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
