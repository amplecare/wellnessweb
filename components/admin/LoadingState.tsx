export function LoadingState({ label = 'Loading dashboard data...' }: { label?: string }) {
  return (
    <div className="rounded-md border border-line bg-white p-8">
      <p className="text-sm text-ink-soft">{label}</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-14 animate-pulse rounded-lg bg-violet-100/60" />
        ))}
      </div>
    </div>
  );
}
