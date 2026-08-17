import type { Metadata } from 'next';
import { FaqBlock, ObjectionHandler } from '@/components/seo/ConversionKit';
import { FinalCta } from '@/components/sections/FinalCta';
import { Hero } from '@/components/sections/Hero';
import { Pricing } from '@/components/sections/Pricing';
import { Problem } from '@/components/sections/Problem';
import { ReportShowcase } from '@/components/sections/ReportShowcase';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { Solution } from '@/components/sections/Solution';
import { Testimonials } from '@/components/sections/Testimonials';
import { Trust } from '@/components/sections/Trust';
import { WhoWeHelp } from '@/components/sections/WhoWeHelp';
import { WhyUs } from '@/components/sections/WhyUs';
import { homeFaqs, homeObjections } from '@/content/pages/home';

export const metadata: Metadata = {
  title: 'Care Staff Wellbeing Consultancy UK | Ample Care Ltd',
  description:
    'Ample Care helps UK care homes, nursing homes and domiciliary providers reduce staff burnout, sickness absence and turnover. Wellbeing assessments from £35 per staff member.',
  keywords: [
    'care staff wellbeing',
    'social care workforce wellbeing',
    'workplace wellbeing for care providers',
    'care staff retention',
    'care worker burnout',
  ],
  alternates: { canonical: '/' },
};

/**
 * The home page, as one argument in seven movements.
 *
 * It previously ran fourteen blocks. Every one was defensible alone, and together
 * they were a long scroll with no sense of progress — a visitor could not tell how
 * far through they were or what the page wanted them to do next.
 *
 * The rebuild groups them into seven movements, each answering one question, in the
 * order a sceptical registered manager actually asks them:
 *
 *   1. Hero .............. what is this, and what does it cost to find out?
 *   2. Problem ........... do you understand my situation?
 *   3. How it works ...... what would you do, and what do I get at the end?
 *   4. What we do ........ is there something here for a service like mine?
 *   5. Why you ........... why should I believe you specifically?
 *   6. Pricing ........... what does it cost?
 *   7. Questions ......... the things I would otherwise have to email and ask.
 *
 * Two blocks were removed rather than restyled:
 *
 * - **The video section.** No film exists yet, so it rendered a "video to commission"
 *   placeholder. That is right for an internal checklist and wrong on the page a
 *   prospect judges you by. It now self-hides until a real video is configured, so it
 *   returns automatically the moment one exists.
 * - **The standalone evidence band.** Its sector statistics already appear in the
 *   problem section. Showing the same three Skills for Care figures twice on one page
 *   made the evidence look thinner, not stronger.
 */
export default function HomePage() {
  return (
    <>
      {/* 1 — What this is. */}
      <Hero />

      {/* 2 — The problem you recognise, carrying the sourced sector evidence. */}
      <Problem />

      {/* 3 — How it works, then the deliverable itself. These read as one movement:
             the process, immediately followed by what it produces, so the insight
             report is shown rather than described. */}
      <Solution />
      <ReportShowcase />

      {/* 4 — What we do, and who it is for. Services first, then the settings, so a
             domiciliary manager can see themselves before reading eight service
             descriptions. */}
      <ServicesGrid />
      <WhoWeHelp />

      {/* 5 — Why Ample Care specifically. Proof escalates: differentiation table,
             then credibility pillars, then client voice. */}
      <WhyUs />
      <Trust />
      <Testimonials />

      {/* 6 — What it costs. */}
      <Pricing />

      {/* 7 — The objections raised internally before enquiring, then the questions
             that would otherwise arrive by email. */}
      <ObjectionHandler
        heading="What providers usually ask us first"
        lead="These come up on almost every call. Here are the honest answers."
        items={homeObjections}
      />
      <FaqBlock items={homeFaqs} />

      {/* The close. */}
      <FinalCta />
    </>
  );
}
