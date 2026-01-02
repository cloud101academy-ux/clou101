/** @type {import('next').NextConfig} */
const nextConfig = {
  // produce a static export (out/ folder)
  //output: 'export',

  // Optional: create folder-per-page (e.g. /about/index.html).
  // Useful for some static hosts — uncomment if you prefer folder pages.
  trailingSlash: true,

  // keep these existing settings
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
