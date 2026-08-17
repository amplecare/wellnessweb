import type { Metadata } from 'next';
import { LandingPage, metadataFor } from '@/components/seo/LandingPage';
import { supportedLiving } from '@/content/pages/sectors';

export const metadata: Metadata = metadataFor('/supported-living');

export default function Page() {
  return <LandingPage content={supportedLiving} />;
}
