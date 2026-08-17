import type { Metadata } from 'next';
import { BreadcrumbSchema, PageHeader } from '@/components/layout/PageHeader';
import { Container, Section } from '@/components/ui/Section';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Ample Care Ltd collects, uses and protects personal data, including staff wellbeing data gathered during assessments.',
  alternates: { canonical: '/privacy' },
  robots: { index: true, follow: true },
};

/**
 * DRAFT POLICY — NOT LEGAL ADVICE.
 *
 * This is GDPR-aware placeholder wording covering the areas a UK care sector
 * consultancy needs to address, written so a solicitor has a sensible starting
 * point. It MUST be reviewed by a qualified solicitor and completed with real
 * company details before launch. See PLACEHOLDERS.md.
 */

const sections = [
  {
    id: 'who-we-are',
    heading: 'Who we are',
    body: [
      `${site.name} ("Ample Care","we","us") is a health promotion and workplace wellbeing consultancy working with care and healthcare providers in the United Kingdom.`,
      `For the purposes of UK data protection law, our contact details are: ${site.email} / ${site.phoneDisplay}. Our registered office is at the address shown in the footer of this website.`,
    ],
  },
  {
    id: 'legal-framework',
    heading: 'The law we work under',
    body: [
      'We process personal data in accordance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.',
      'Where we process personal data on behalf of a care provider — for example, staff responses to a wellbeing assessment — that provider is the data controller and Ample Care acts as data processor under a written data processing agreement.',
      'Where we process data for our own purposes — for example, responding to an enquiry from your website form — we act as data controller.',
    ],
  },
  {
    id: 'what-we-collect',
    heading: 'What we collect',
    body: [
      'Enquiry data: your name, organisation, role, approximate staff count, email address, phone number, and anything you choose to tell us in the message field.',
      'Client and contract data: contact details for the people we work with at your organisation, plus the records needed to deliver and invoice a programme.',
      'Wellbeing assessment data: responses provided by your staff. This may include information about how individuals feel about their work, their workload and their health. Some of this may constitute special category data concerning health, which we handle with additional safeguards.',
      'Website data: basic technical information such as pages visited and approximate location, where analytics are in use.',
    ],
  },
  {
    id: 'wellbeing-data',
    heading: 'How we handle staff wellbeing data',
    body: [
      'This is the part care providers ask us about most, so we set it out plainly.',
      'Participation is voluntary. No member of staff is required to take part in a wellbeing assessment, and choosing not to take part has no consequences for them.',
      'Individual responses are never shared with your management team. We report findings in aggregate only.',
      'We apply a minimum group size before reporting any breakdown, so that results cannot be traced back to an individual. Where a team is too small to report on safely, we say so rather than publishing a figure that would identify someone.',
      'Staff are told, before they take part, what we are collecting, why, who will see it, and how long it will be kept.',
      'Assessment data is held within the United Kingdom, and is deleted or returned to you at the end of the engagement in line with the data processing agreement.',
      'If a response discloses a risk of serious harm to the individual or to someone in their care, we will follow the safeguarding escalation route agreed with you in advance. This is the one circumstance in which confidentiality may be limited, and it is disclosed to staff before they take part.',
    ],
  },
  {
    id: 'lawful-basis',
    heading: 'Our lawful bases',
    body: [
      'Legitimate interests: responding to business enquiries and communicating with client organisations about work in progress.',
      'Contract: delivering the services we have agreed with your organisation.',
      'Consent: where staff choose to take part in a wellbeing assessment, and for any optional marketing communications.',
      'Legal obligation: retaining records where accounting, tax or other law requires it.',
      'Where we process special category health data, we do so on the basis of explicit consent, or on another applicable Article 9 condition set out in the data processing agreement with the controller.',
    ],
  },
  {
    id: 'sharing',
    heading: 'Who we share data with',
    body: [
      'We do not sell personal data, and we do not share it for advertising.',
      'We use a small number of service providers to run our business — for example email hosting, secure survey tooling, and accounting software. Each is bound by a contract that restricts them to processing data on our instructions.',
      'We will disclose personal data where we are legally required to, or where safeguarding obligations apply as described above.',
    ],
  },
  {
    id: 'retention',
    heading: 'How long we keep it',
    body: [
      'Enquiries that do not lead to work: kept for a limited period and then deleted.',
      'Client records: kept for the duration of the engagement and then for the period required by accounting and limitation law.',
      'Wellbeing assessment data: kept only as long as needed to deliver and evaluate the programme, then deleted or returned to the controller.',
    ],
  },
  {
    id: 'your-rights',
    heading: 'Your rights',
    body: [
      'You have the right to ask what personal data we hold about you, to have inaccurate data corrected, to have data erased in certain circumstances, to restrict or object to processing, to receive your data in a portable format, and to withdraw consent where consent is our lawful basis.',
      `To exercise any of these rights, contact us at ${site.email}. We will respond within one month.`,
      'If your data was provided as part of an assessment commissioned by your employer, your employer is the controller and you may also exercise your rights directly with them. We will support them in responding.',
      'If you are unhappy with how we have handled your data, you can complain to the Information Commissioner’s Office at ico.org.uk or on 0303 123 1113.',
    ],
  },
  {
    id: 'security',
    heading: 'Security',
    body: [
      'We use access controls, encryption in transit, and role-based restrictions so that only the people who need access to data have it. Assessment responses are separated from identifying information as early in the process as is practicable.',
    ],
  },
  {
    id: 'changes',
    heading: 'Changes to this policy',
    body: [
      'We will update this page when our practices change, and will note the date of the most recent revision below.',
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        breadcrumb="Privacy Policy"
        title="Privacy Policy"
        lead="How we collect, use and protect personal data — including the staff wellbeing data gathered during an assessment, which we treat with particular care."
      />

      <Section tone="paper">
        <Container width="narrow">


          {/* Contents list — the policy is long and managers will want to jump. */}
          <nav
            aria-label="Policy contents"
            className="rounded-md border border-white/10 bg-white/[0.04] p-6"
          >
            <h2 className="text-eyebrow uppercase text-lumen-muted">Contents</h2>
            <ol className="mt-4 flex flex-col gap-2">
              {sections.map((s, i) => (
                <li key={s.id} className="flex gap-2.5 text-[0.9375rem]">
                  <span className="nums shrink-0 text-lumen-muted">{i + 1}.</span>
                  <a
                    href={`#${s.id}`}
                    className="text-mint-300 underline decoration-violet-200 underline-offset-2 hover:decoration-mint-500"
                  >
                    {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-14 flex flex-col gap-12">
            {sections.map((section, i) => (
              <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`}>
                <h2
                  id={`${section.id}-heading`}
                  className="flex items-baseline gap-3 text-display-md"
                >
                  <span className="nums text-[0.875rem] font-semibold text-mint-300">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {section.heading}
                </h2>
                <div className="mt-4 flex flex-col gap-4 pl-0 sm:pl-9">
                  {/* Any line still marked PLACEHOLDER is an internal note to whoever
                      completes this document, not policy content. It is filtered out
                      rather than rendered — a visitor reading "PLACEHOLDER: confirm ICO
                      registration number" inside a privacy policy learns only that
                      nobody finished it. Outstanding items stay tracked in
                      PLACEHOLDERS.md. */}
                  {section.body
                    .filter((para) => !para.startsWith('PLACEHOLDER:'))
                    .map((para) => (
                      <p key={para} className="leading-relaxed text-lumen-soft">
                        {para}
                      </p>
                    )
                  )}
                </div>
              </section>
            ))}
          </div>
        </Container>
      </Section>

      <BreadcrumbSchema siteUrl={site.url} items={[{ name: 'Privacy Policy', path: '/privacy' }]} />
    </>
  );
}
