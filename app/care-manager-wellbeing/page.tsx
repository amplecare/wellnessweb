import type { Metadata } from 'next';
import { LandingPage, metadataFor } from '@/components/seo/LandingPage';
import { careManagerWellbeing } from '@/content/pages/careManagerWellbeing';

export const metadata: Metadata = metadataFor('/care-manager-wellbeing');

export default function Page() {
  return <LandingPage content={careManagerWellbeing} />;
}
