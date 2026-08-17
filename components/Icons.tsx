import type { SVGProps } from 'react';

/**
 * Hand-built line icons on a 24px grid, 1.5px stroke, round caps.
 * Drawn for this brief rather than pulled from a generic icon set — the visual
 * grammar is clinical-but-warm (stethoscope, heart, clock, shield) as specified.
 *
 * Icons are decorative by default (aria-hidden). Any icon that carries meaning
 * on its own must be given a `title`, which turns it into an accessible image.
 */

export type IconName =
  | 'clipboard'
  | 'battery'
  | 'heart'
  | 'brain'
  | 'shield'
  | 'users'
  | 'leaf'
  | 'link'
  | 'stethoscope'
  | 'clock'
  | 'trendDown'
  | 'doorOut'
  | 'weight'
  | 'chart'
  | 'compass'
  | 'lock'
  | 'check'
  | 'arrowRight'
  | 'phone'
  | 'mail'
  | 'quote'
  | 'spark';

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
  /** Provide only when the icon conveys meaning not present in adjacent text. */
  title?: string;
};

const paths: Record<IconName, React.ReactNode> = {
  clipboard: (
    <>
      <path d="M9 4.5h6M9 4.5a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 4.5M9 4.5H7.5A1.5 1.5 0 0 0 6 6v13.5A1.5 1.5 0 0 0 7.5 21h9a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H15" />
      <path d="M9.25 11.5h5.5M9.25 15h3.5" />
    </>
  ),
  battery: (
    <>
      <rect x="2.75" y="8" width="15.5" height="8" rx="2.25" />
      <path d="M21.25 11v2" />
      <path d="M6 11v2M9.5 11v2" />
    </>
  ),
  heart: (
    <path d="M12 20s-7.5-4.35-7.5-9.5a4.25 4.25 0 0 1 7.5-2.77A4.25 4.25 0 0 1 19.5 10.5c0 5.15-7.5 9.5-7.5 9.5Z" />
  ),
  brain: (
    <>
      <path d="M12 5.5V19" />
      <path d="M12 6.5A3 3 0 0 0 6.6 8.2 2.6 2.6 0 0 0 5 13a2.9 2.9 0 0 0 1.6 4.4A2.8 2.8 0 0 0 12 18" />
      <path d="M12 6.5A3 3 0 0 1 17.4 8.2 2.6 2.6 0 0 1 19 13a2.9 2.9 0 0 1-1.6 4.4A2.8 2.8 0 0 1 12 18" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.25 5 5.9v5.2c0 4.2 2.85 7.7 7 9.65 4.15-1.95 7-5.45 7-9.65V5.9Z" />
      <path d="M9.4 11.9l1.9 1.9 3.4-3.6" />
    </>
  ),
  users: (
    <>
      <circle cx="9.25" cy="8.25" r="3" />
      <path d="M3.5 20a5.75 5.75 0 0 1 11.5 0" />
      <path d="M16 5.6a3 3 0 0 1 0 5.3M17.75 20a5.7 5.7 0 0 0-1.6-3.95" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 19c0-7.5 5-13 15-13 0 7.5-4.5 13-11 13a5.6 5.6 0 0 1-4-1Z" />
      <path d="M8 16c2.5-3.5 5.5-6 9-7.5" />
    </>
  ),
  link: (
    <>
      <path d="M10 13.9a3.6 3.6 0 0 0 5.1 0l2.6-2.6a3.6 3.6 0 0 0-5.1-5.1l-1 1" />
      <path d="M14 10.1a3.6 3.6 0 0 0-5.1 0l-2.6 2.6a3.6 3.6 0 0 0 5.1 5.1l1-1" />
    </>
  ),
  stethoscope: (
    <>
      <path d="M6 3.5v5a4 4 0 0 0 8 0v-5" />
      <path d="M4.25 3.5h2M13 3.5h2" />
      <path d="M10 16.5v-4" />
      <path d="M10 16.5a4.25 4.25 0 0 0 8.5 0v-2" />
      <circle cx="18.5" cy="11.5" r="2" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.25V12l3.25 2" />
    </>
  ),
  trendDown: (
    <>
      <path d="M3.5 7.5 10 14l3.5-3.5L20.5 17" />
      <path d="M20.5 12.5V17H16" />
    </>
  ),
  doorOut: (
    <>
      <path d="M13.5 3.5h-7A1.5 1.5 0 0 0 5 5v14a1.5 1.5 0 0 0 1.5 1.5h7" />
      <path d="M15.5 8.5 19 12l-3.5 3.5M10.5 12H19" />
    </>
  ),
  weight: (
    <>
      <path d="M3.5 20.5h17L18 9.5H6Z" />
      <path d="M9.25 9.5a2.75 2.75 0 1 1 5.5 0" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20.5V4" />
      <path d="M4 20.5h16.5" />
      <path d="M8 17V12M12.25 17V7.5M16.5 17v-6.5" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m14.75 9.25-1.4 4.1-4.1 1.4 1.4-4.1Z" />
    </>
  ),
  lock: (
    <>
      <rect x="4.75" y="10.5" width="14.5" height="10" rx="2" />
      <path d="M8.25 10.5V7.75a3.75 3.75 0 0 1 7.5 0v2.75" />
    </>
  ),
  check: <path d="m4.75 12.5 4.5 4.5L19.25 7" />,
  arrowRight: (
    <>
      <path d="M4.5 12h15" />
      <path d="m13.5 6 6 6-6 6" />
    </>
  ),
  phone: (
    <path d="M7.4 3.75h-.9A2.6 2.6 0 0 0 4 6.5c0 7.6 5.9 13.5 13.5 13.5a2.6 2.6 0 0 0 2.75-2.5v-.9a1.3 1.3 0 0 0-1-1.25l-3-.7a1.3 1.3 0 0 0-1.3.5l-.85 1.1a11.4 11.4 0 0 1-5-5l1.1-.85a1.3 1.3 0 0 0 .5-1.3l-.7-3a1.3 1.3 0 0 0-1.25-1Z" />
  ),
  mail: (
    <>
      <rect x="3" y="5.25" width="18" height="13.5" rx="2" />
      <path d="m3.75 7 8.25 6 8.25-6" />
    </>
  ),
  quote: (
    <path d="M9.5 6.5C6.75 8 5.5 10.25 5.5 13.5c0 2.5 1.4 4 3.4 4 1.75 0 3.1-1.25 3.1-3.1 0-1.75-1.2-3-2.85-3-.3 0-.6.05-.85.15.35-1.6 1.4-2.85 3.05-3.8Zm8.25 0C15 8 13.75 10.25 13.75 13.5c0 2.5 1.4 4 3.4 4 1.75 0 3.1-1.25 3.1-3.1 0-1.75-1.2-3-2.85-3-.3 0-.6.05-.85.15.35-1.6 1.4-2.85 3.05-3.8Z" />
  ),
  spark: <path d="M12 3.5l1.9 5.1 5.1 1.9-5.1 1.9L12 17.5l-1.9-5.1L5 10.5l5.1-1.9Z" />,
};

/** Icons drawn as filled shapes rather than strokes. */
const filled = new Set<IconName>(['quote']);

export function Icon({ name, title, className, ...rest }: IconProps) {
  const isFilled = filled.has(name);
  return (
    <svg
      viewBox="0 0 24 24"
      fill={isFilled ? 'currentColor' : 'none'}
      stroke={isFilled ? 'none' : 'currentColor'}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {paths[name]}
    </svg>
  );
}
