import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  reactStrictMode: true,
  transpilePackages: ["@fynd-design-engineering/fynd-one-ds"],
  typescript: {
    ignoreBuildErrors: false,
  },
  async redirects() {
    return [
      {
        source: "/cookbooks/forge/:path*",
        destination: "/cookbooks/ERP/Forge/:path*",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/assets/InterDisplay-Regular.ttf",
        destination: "/webflow-fonts/InterDisplay-Regular.ttf",
      },
      {
        source: "/assets/InterDisplay-Medium.ttf",
        destination: "/webflow-fonts/InterDisplay-Medium.ttf",
      },
      {
        source: "/assets/InterDisplay-SemiBold.ttf",
        destination: "/webflow-fonts/InterDisplay-SemiBold.ttf",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" }
        ],
      },
    ];
  },
};

export default nextConfig;
