import type { Metadata } from 'next';
import { LandingPage, metadataFor } from '@/components/seo/LandingPage';
import { careWorkerBurnout } from '@/content/pages/careWorkerBurnout';

export const metadata: Metadata = metadataFor('/care-worker-burnout');

export default function Page() {
  return <LandingPage content={careWorkerBurnout} />;
}
