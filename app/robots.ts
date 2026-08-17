import type { MetadataRoute } from 'next';
import { site } from '@/content/site';

export default function robots(): MetadataRoute.Robots {
  return {
    // /admin is behind a login, and its pages already send `noindex` — but keeping it
    // out of robots.txt too stops the login URL surfacing in search results at all.
    rules: [{ userAgent: '*', allow: '/', disallow: '/admin' }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
