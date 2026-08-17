import type { Metadata } from 'next';
import { LandingPage, metadataFor } from '@/components/seo/LandingPage';
import { careStaffAbsence } from '@/content/pages/careStaffAbsence';

export const metadata: Metadata = metadataFor('/care-staff-absence');

export default function Page() {
  return <LandingPage content={careStaffAbsence} />;
}
