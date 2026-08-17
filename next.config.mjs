/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Allow the dev server to be opened from other devices on the LAN (e.g. a phone).
  // Next.js only matches these as exact hostnames or `*.` wildcard subdomains — it
  // does not support CIDR ranges — so a device's LAN IP has to be listed here
  // explicitly. IPs go stale whenever a machine reconnects to Wi-Fi or a hotspot;
  // if a phone/tablet gets blocked again, check the dev server's terminal for a
  // "Blocked cross-origin request from <ip>" warning and add that IP below.
  allowedDevOrigins: ['172.20.10.2', '10.253.156.154', '192.168.0.75', '*.local'],
  images: {
    // Real photography should be dropped into /public/images and referenced via
    // next/image, which serves AVIF/WebP with automatic fallbacks.
    formats: ['image/avif', 'image/webp'],
  },
  poweredByHeader: false,
};

export default nextConfig;
