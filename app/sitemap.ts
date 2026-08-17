import type { MetadataRoute } from 'next';
import { articles } from '@/content/resources';
import { services } from '@/content/services';
import { assertNoCannibalisation, seoPages } from '@/content/seo/keywordMap';
import { site } from '@/content/site';

/**
 * The sitemap is generated from the keyword map, not maintained by hand.
 *
 * Two consequences worth keeping: a page cannot be added to the site without a
 * keyword map entry (so it cannot be orphaned or shipped without a canonical), and
 * `assertNoCannibalisation` runs at build time — two pages claiming the same primary
 * keyword breaks the build rather than quietly splitting their own rankings.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  assertNoCannibalisation();

  const now = new Date();

  /** Pages that exist for users rather than for search. */
  const staticRoutes: { path: string; priority: number; changeFrequency: 'monthly' | 'yearly' }[] = [
    { path: '', priority: 1, changeFrequency: 'monthly' },
    { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/pricing', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.8, changeFrequency: 'yearly' },
    { path: '/privacy', priority: 0.2, changeFrequency: 'yearly' },
    { path: '/resources', priority: 0.7, changeFrequency: 'monthly' },
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${site.url}${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),

    // Every mapped landing page.
    ...seoPages.map((page) => ({
      url: `${site.url}${page.path}`,
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),

    // Individual service pages.
    ...services.map((service) => ({
      url: `${site.url}/services/${service.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),

    // Resource articles.
    ...articles.map((article) => ({
      url: `${site.url}/resources/${article.slug}`,
      lastModified: new Date(article.published),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ];
}
