type Item = { label: string; value: number };

export function TrendBars({ items, max }: { items: Item[]; max?: number }) {
  const top = max ?? Math.max(...items.map((item) => item.value), 1);

  return (
    <ul className="space-y-3">
      {items.map((item) => {
        const width = `${Math.max(8, Math.round((item.value / top) * 100))}%`;
        return (
          <li key={item.label}>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="text-ink-soft">{item.label}</span>
              <span className="font-semibold text-ink nums">{item.value}</span>
            </div>
            <div className="h-2 rounded-full bg-violet-100">
              <div className="h-2 rounded-full bg-violet-600" style={{ width }} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
