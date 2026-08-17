import Link from 'next/link';
import { Icon } from '@/components/Icons';
import { ArcMark } from '@/components/ui/Decor';
import { Container } from '@/components/ui/Section';
import { footerNav, site } from '@/content/site';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-violet-800 bg-deep text-lumen-soft">
      <Container width="wide">
        <div className="grid gap-12 py-16 lg:grid-cols-[1.4fr_repeat(3,1fr)] lg:gap-8 lg:py-20">
          <div className="max-w-sm">
            <ArcMark tone="brand" className="size-9" strokeWidth={2} />
            <p className="mt-6 font-display text-[1.75rem] font-semibold leading-none tracking-[-0.03em] text-lumen">
              Ample Care Ltd
            </p>
            <p className="mt-3 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-mint-300">
              {site.tagline}
            </p>
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-lumen-soft">
              Practical health promotion and workplace wellbeing programmes for UK care providers —
              built around the realities of shift work, staffing pressure and CQC expectations.
            </p>

            <div className="mt-6 flex flex-col gap-2.5 text-[0.9375rem]">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2.5 text-lumen-soft transition-colors hover:text-mint-300"
              >
                <Icon name="mail" className="size-4 shrink-0 text-mint-300" />
                {site.email}
              </a>
              <a
                href={`tel:${site.phone.replace(/\s/g, '')}`}
                className="inline-flex items-center gap-2.5 text-lumen-soft transition-colors hover:text-mint-300"
              >
                <Icon name="phone" className="size-4 shrink-0 text-mint-300" />
                {site.phoneDisplay}
              </a>
            </div>
          </div>

          {footerNav.map((group) => (
            <nav key={group.heading} aria-label={group.heading}>
              <h2 className="text-eyebrow uppercase text-mint-300">{group.heading}</h2>
              <ul className="mt-5 flex flex-col gap-3">
                {group.items.map((item) => (
                  <li key={item.href + item.label}>
                    <Link
                      href={item.href}
                      className="text-[0.9375rem] text-lumen-soft transition-colors hover:text-lumen"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-violet-800 py-8 text-[0.8125rem] text-lumen-soft sm:flex-row sm:items-start sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> · </span>
            {/* PLACEHOLDER: confirm company number and registered office before launch. */}
            Registered in England &amp; Wales, company no. {site.companyNumber}.
          </p>
          <p className="max-w-md sm:text-right">
            Ample Care is a wellbeing consultancy. We do not provide clinical treatment or crisis
            support. If you or a colleague need urgent help, contact your GP, call NHS 111, or call
            999 in an emergency.
          </p>
        </div>
      </Container>
    </footer>
  );
}
