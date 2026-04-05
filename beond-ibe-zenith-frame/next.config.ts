import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/header-page",
        destination: "/tti-ibe-iframe-pages/header-only",
        permanent: true,
      },
      {
        source: "/footer-page",
        destination: "/tti-ibe-iframe-pages/footer-only",
        permanent: true,
      },
      // Legacy locale URLs → single-page home
      { source: "/en", destination: "/", permanent: false },
      { source: "/de", destination: "/", permanent: false },
      { source: "/ar", destination: "/", permanent: false },
      { source: "/en/:path*", destination: "/", permanent: false },
      { source: "/de/:path*", destination: "/", permanent: false },
      { source: "/ar/:path*", destination: "/", permanent: false },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
