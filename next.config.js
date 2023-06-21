/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental:{
  //     serverComponentsExternalPackages:["@prisma/client","bcrypt"]
  // }
  images: {
    remotePatterns: [
      {
        hostname: "picsum.photos",
      },
      {
        hostname:"localhost"
      }
    ],
  },
};

module.exports = nextConfig;
