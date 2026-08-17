import Link from 'next/link';
import type { ReactNode } from 'react';
import { Icon } from '@/components/Icons';
import { ArcField } from '@/components/ui/Decor';
import { Container, Eyebrow } from '@/components/ui/Section';

/**
 * Inner-page masthead with breadcrumbs. Breadcrumbs are real links and are also
 * emitted as BreadcrumbList structured data by each page that uses them.
 */
export function PageHeader({
  eyebrow,
  title,
  lead,
  breadcrumb,
  children,
}: {
  eyebrow: string;
  title: string;
  lead: ReactNode;
  breadcrumb: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-white/[0.04]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-48 size-[34rem] rounded-full bg-white/[0.06] blur-3xl" />
        <div className="absolute -right-24 -bottom-40 size-[26rem] rounded-full bg-mint-400/10 blur-3xl" />
        <ArcField className="absolute -right-20 -top-32 h-[34rem] w-[34rem] opacity-60" />
      </div>

      <Container width="wide" className="relative">
        <nav aria-label="Breadcrumb" className="pt-8">
          <ol className="flex items-center gap-2 text-[0.8125rem] text-lumen-muted">
            <li>
              <Link href="/" className="rounded-sm hover:text-mint-300">
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <Icon name="arrowRight" className="size-3 text-lumen-soft" />
            </li>
            <li className="font-medium text-lumen" aria-current="page">
              {breadcrumb}
            </li>
          </ol>
        </nav>

        <div className="max-w-3xl pb-18 pt-12 sm:pb-24 sm:pt-16">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-6 text-display-2xl text-lumen">{title}</h1>
          <div className="mt-7 text-lead text-lumen-soft">{lead}</div>
          {children ? <div className="mt-10">{children}</div> : null}
        </div>
      </Container>
    </section>
  );
}

/** BreadcrumbList JSON-LD for an inner page. */
export function BreadcrumbSchema({
  siteUrl,
  items,
}: {
  siteUrl: string;
  items: readonly { name: string; path: string }[];
}) {
  const json = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '/' }, ...items].map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />
  );
}
