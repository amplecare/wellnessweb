import type { Metadata } from 'next';
import { LandingPage, metadataFor } from '@/components/seo/LandingPage';
import { careWorkforceWellbeing } from '@/content/pages/careWorkforceWellbeing';

export const metadata: Metadata = metadataFor('/care-workforce-wellbeing');

export default function Page() {
  return <LandingPage content={careWorkforceWellbeing} />;
}
