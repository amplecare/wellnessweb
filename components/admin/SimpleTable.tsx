import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export function SimpleTable({
  headers,
  children,
  className,
}: {
  headers: string[];
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('overflow-x-auto rounded-md border border-line bg-white', className)}>
      <table className="min-w-full border-separate border-spacing-0 text-left text-sm">
        <thead>
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="border-b border-line bg-paper-lumen px-4 py-3 text-xs font-semibold uppercase tracking-[0.11em] text-ink-muted"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export function Row({ children }: { children: ReactNode }) {
  return <tr className="odd:bg-white even:bg-violet-50/25">{children}</tr>;
}

export function Cell({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <td className={cn('border-b border-line/70 px-4 py-3 align-top text-ink-soft', className)}>
      {children}
    </td>
  );
}
