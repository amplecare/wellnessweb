/**
 * Minimal class joiner. Deliberately not clsx/tailwind-merge — this site has no
 * runtime class conflicts worth a dependency, and every kilobyte counts on a
 * phone between shifts.
 */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}
