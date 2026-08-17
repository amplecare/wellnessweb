import type { Metadata } from 'next';
import { LandingPage, metadataFor } from '@/components/seo/LandingPage';
import { workforceWellbeingAssessment } from '@/content/pages/workforceWellbeingAssessment';

export const metadata: Metadata = metadataFor('/workforce-wellbeing-assessment');

export default function Page() {
  return <LandingPage content={workforceWellbeingAssessment} />;
}
