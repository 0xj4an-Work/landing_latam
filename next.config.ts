import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Prevent Next from "walking up" and inferring an incorrect monorepo root
    // when other lockfiles exist elsewhere on your machine.
    root: process.cwd(),
  },
};

export default nextConfig;
