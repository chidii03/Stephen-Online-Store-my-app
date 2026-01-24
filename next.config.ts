import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "localhost",
      "img.freepik.com",
      "companieslogo.com",
      "images.seeklogo.com",
      "vectorseek.com",
      "www.logotypes101.com",
      "tse2.mm.bing.net",
      "tse3.mm.bing.net",
      "static.vecteezy.com",
      "tse1.mm.bing.net",
      "th.bing.com",
      "tse4.mm.bing.net",
      "upload.wikimedia.org",
      "source.upload.wikimedia.org",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.amazon.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
