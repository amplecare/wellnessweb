import { cn } from '@/lib/cn';

type Tone = 'neutral' | 'good' | 'warn' | 'danger' | 'info';

const tones: Record<Tone, string> = {
  neutral: 'bg-violet-50 text-ink-soft border-line',
  good: 'bg-mint-100 text-mint-800 border-mint-200',
  warn: 'bg-amber-100 text-amber-800 border-amber-200',
  danger: 'bg-rose-100 text-rose-800 border-rose-200',
  info: 'bg-violet-100 text-violet-800 border-violet-200',
};

export function StatusPill({ label, tone = 'neutral' }: { label: string; tone?: Tone }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold',
        tones[tone]
      )}
    >
      {label}
    </span>
  );
}
