type Item = {
  id: string;
  title: string;
  detail: string;
  meta: string;
};

export function Timeline({ items }: { items: Item[] }) {
  return (
    <ol className="space-y-4">
      {items.map((item) => (
        <li key={item.id} className="relative rounded-lg border border-line bg-white p-4 pl-6">
          <span
            className="absolute left-2.5 top-6 size-2 rounded-full bg-violet-600"
            aria-hidden="true"
          />
          <p className="text-sm font-semibold text-ink">{item.title}</p>
          <p className="mt-1 text-sm text-ink-soft">{item.detail}</p>
          <p className="mt-2 text-xs font-medium uppercase tracking-[0.1em] text-ink-muted">
            {item.meta}
          </p>
        </li>
      ))}
    </ol>
  );
}
