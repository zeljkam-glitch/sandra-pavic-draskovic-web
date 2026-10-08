import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "(www\\.)?sandrapavicdraskovic\\.com|www\\.naturasanat\\.hr",
          },
        ],
        destination: "https://naturasanat.hr/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
