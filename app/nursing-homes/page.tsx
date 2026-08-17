import type { Metadata } from 'next';
import { LandingPage, metadataFor } from '@/components/seo/LandingPage';
import { nursingHomes } from '@/content/pages/sectors';

export const metadata: Metadata = metadataFor('/nursing-homes');

export default function Page() {
  return <LandingPage content={nursingHomes} />;
}
