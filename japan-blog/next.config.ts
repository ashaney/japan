import type { NextConfig } from "next";

// @ts-ignore - MDX module doesn't have proper TypeScript types
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  // Next.js 15+ has App Router enabled by default
};

export default withMDX(nextConfig);
