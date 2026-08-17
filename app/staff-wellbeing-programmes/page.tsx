import type { Metadata } from 'next';
import { LandingPage, metadataFor } from '@/components/seo/LandingPage';
import { staffWellbeingProgrammes } from '@/content/pages/staffWellbeingProgrammes';

export const metadata: Metadata = metadataFor('/staff-wellbeing-programmes');

export default function Page() {
  return <LandingPage content={staffWellbeingProgrammes} />;
}
