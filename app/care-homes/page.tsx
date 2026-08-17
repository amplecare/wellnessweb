import type { Metadata } from 'next';
import { LandingPage, metadataFor } from '@/components/seo/LandingPage';
import { careHomes } from '@/content/pages/sectors';

export const metadata: Metadata = metadataFor('/care-homes');

export default function Page() {
  return <LandingPage content={careHomes} />;
}
