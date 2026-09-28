import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "sandrapavicdraskovic.com",
          },
        ],
        destination: "https://www.sandrapavicdraskovic.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
