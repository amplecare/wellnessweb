import type { Metadata } from 'next';
import { LandingPage, metadataFor } from '@/components/seo/LandingPage';
import { healthcareProviders } from '@/content/pages/sectors';

export const metadata: Metadata = metadataFor('/healthcare-providers');

export default function Page() {
  return <LandingPage content={healthcareProviders} />;
}
