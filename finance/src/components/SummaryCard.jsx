import { formatCurrency } from "../utils/finance";

function SummaryCard({ title, amount, accent = "var(--cobalt)", subtitle, hint }) {
  return (
    <article
      className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-md shadow-slate-200/40 transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900/80 dark:shadow-none"
      style={{
        backgroundImage: `linear-gradient(125deg, ${accent}20 0%, #ffffff 64%)`,
      }}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-600 dark:text-slate-300">{title}</p>
      <p className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white">{formatCurrency(amount)}</p>
      {subtitle ? <p className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-300">{subtitle}</p> : null}
      {hint ? <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">{hint}</p> : null}
      <span
        className="pointer-events-none absolute right-0 top-0 h-14 w-14 rounded-bl-[1.4rem]"
        style={{ backgroundColor: accent }}
      />
    </article>
  );
}

export default SummaryCard;