import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    // point turbopack to this repo root (avoid non-ASCII parts outside this path)
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
