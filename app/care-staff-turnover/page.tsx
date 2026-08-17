import type { Metadata } from 'next';
import { LandingPage, metadataFor } from '@/components/seo/LandingPage';
import { careStaffTurnover } from '@/content/pages/careStaffTurnover';

export const metadata: Metadata = metadataFor('/care-staff-turnover');

export default function Page() {
  return <LandingPage content={careStaffTurnover} />;
}
