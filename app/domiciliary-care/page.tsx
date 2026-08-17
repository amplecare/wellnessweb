import type { Metadata } from 'next';
import { LandingPage, metadataFor } from '@/components/seo/LandingPage';
import { domiciliaryCare } from '@/content/pages/sectors';

export const metadata: Metadata = metadataFor('/domiciliary-care');

export default function Page() {
  return <LandingPage content={domiciliaryCare} />;
}
