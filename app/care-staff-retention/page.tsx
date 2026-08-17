import type { Metadata } from 'next';
import { LandingPage, metadataFor } from '@/components/seo/LandingPage';
import { careStaffRetention } from '@/content/pages/careStaffRetention';

export const metadata: Metadata = metadataFor('/care-staff-retention');

export default function Page() {
  return <LandingPage content={careStaffRetention} />;
}
