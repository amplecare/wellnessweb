import type { Metadata, Viewport } from 'next';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Analytics } from '@/components/Analytics';
import { RevealProvider } from '@/components/ui/Reveal';
import { site } from '@/content/site';
import { services } from '@/content/services';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Healthcare Workplace Wellbeing Consultancy UK | Ample Care Ltd',
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  keywords: [
    'care home wellbeing support UK',
    'staff wellbeing assessments for care homes',
    'healthcare workplace wellbeing consultancy UK',
    'care worker burnout support',
    'employee wellbeing programme UK',
    'CQC staff wellbeing support',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: site.name,
    url: site.url,
    title: 'Reduce Care Staff Burnout. Improve Wellbeing. Build Stronger Care Teams.',
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Healthcare Workplace Wellbeing Consultancy UK | Ample Care Ltd',
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  formatDetection: { telephone: true, address: false, email: true },
};

export const viewport: Viewport = {
  themeColor: '#050411',
  // 'dark' so browser-rendered controls, scrollbars and form widgets match the
  // canvas. Left on 'light' they render pale chrome over a dark page.
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

/**
 * Structured data. Deliberately contains no aggregateRating or review markup:
 * the testimonials currently on the site are illustrative placeholders, and
 * publishing those as Review structured data would misrepresent them. Add review
 * markup only once real, attributable client quotes are in place.
 */
function StructuredData() {
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': `${site.url}/#organisation`,
        name: site.name,
        alternateName: site.shortName,
        description: site.description,
        url: site.url,
        email: site.email,
        telephone: site.phone,
        priceRange: '££',
        currenciesAccepted: site.currency,
        address: {
          '@type': 'PostalAddress',
          streetAddress: site.address.street,
          addressLocality: site.address.locality,
          addressRegion: site.address.region,
          postalCode: site.address.postcode,
          addressCountry: site.address.country,
        },
        areaServed: { '@type': 'Country', name: site.areaServed },
        knowsAbout: [
          'Workplace wellbeing',
          'Health promotion',
          'Care worker burnout',
          'Adult social care workforce retention',
          'CQC well-led',
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Wellbeing services for UK care providers',
          itemListElement: services.map((s) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: s.title,
              description: s.summary,
              url: `${site.url}/services#${s.slug}`,
              serviceType: 'Workplace wellbeing consultancy',
              provider: { '@id': `${site.url}/#organisation` },
              areaServed: { '@type': 'Country', name: site.areaServed },
            },
            priceSpecification: {
              '@type': 'UnitPriceSpecification',
              price: site.priceFrom,
              priceCurrency: site.currency,
              unitText: 'per staff member',
              valueAddedTaxIncluded: false,
            },
          })),
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${site.url}/#website`,
        url: site.url,
        name: site.name,
        inLanguage: 'en-GB',
        publisher: { '@id': `${site.url}/#organisation` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Static, author-controlled object — no user input reaches this string.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      {/* The aurora canvas wraps everything. It has to sit here rather than on each
          page, so the drifting light is continuous as you navigate — a gradient that
          restarts on every route change is the fastest way to make this look cheap. */}
      <body className="aurora min-h-svh">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-violet-600 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to main content
        </a>

        <Header />
        <main id="main">{children}</main>
        <Footer />

        <RevealProvider />
        <Analytics />
        <StructuredData />
      </body>
    </html>
  );
}
