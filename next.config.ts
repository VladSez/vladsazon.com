import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/cv.pdf",
        destination: "/vlad-sazon-cv.pdf",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
