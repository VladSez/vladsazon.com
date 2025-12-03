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
      {
        source: "/cv",
        destination: "/vlad-sazon-cv.pdf",
        permanent: true,
      },
      {
        source: "/linkedin",
        destination: "https://dub.sh/vladsazon-linkedin",
        permanent: true,
      },
      {
        source: "/github",
        destination: "https://git.new/vldzn",
        permanent: true,
      },
      {
        source: "/x",
        destination: "https://dub.sh/vldszn-x.com",
        permanent: true,
      },
      {
        source: "/invoice",
        destination: "https://dub.sh/invoice-stripe",
        permanent: true,
      },
      {
        source: "/role-fit",
        destination: "https://dub.sh/role-fit",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
