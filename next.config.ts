import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images : {
    remotePatterns : [
      {
        hostname : "datapa.b-cdn.net"
      }
    ]
  }
};

export default nextConfig;
