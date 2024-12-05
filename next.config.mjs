/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
      unoptimized: true,
    },
    basePath: '/openmesh-cloud-visualizer',
    assetPrefix: '/openmesh-cloud-visualizer/',
    trailingSlash: true,
}
  
export default nextConfig