import type { Metadata } from 'next';
import { LandingPage, metadataFor } from '@/components/seo/LandingPage';
import { careStaffMorale } from '@/content/pages/careStaffMorale';

export const metadata: Metadata = metadataFor('/care-staff-morale');

export default function Page() {
  return <LandingPage content={careStaffMorale} />;
}
