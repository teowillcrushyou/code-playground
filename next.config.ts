import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // InMotion can serve the exported site directly from the domain's web folder.
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
