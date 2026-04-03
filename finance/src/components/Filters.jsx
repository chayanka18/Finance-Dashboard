import { useStore } from "../store/useStore";

function Filters() {
  const { filter, setFilter, resetFilters } = useStore();

  return (
    <div className="flex flex-wrap items-center gap-3">
      <label htmlFor="typeFilter" className="text-sm font-semibold text-slate-600 dark:text-slate-50">
        Type
      </label>
      <select
        id="typeFilter"
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
        className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 focus:border-sky-500 focus:outline-none dark:border-slate-600 dark:bg-slate-900 dark:text-slate-50"
      >
        <option value="all">All transactions</option>
        <option value="income">Income only</option>
        <option value="expense">Expense only</option>
      </select>

      <button
        type="button"
        onClick={resetFilters}
        className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-400 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-50 dark:hover:bg-slate-800"
      >
        Reset
      </button>
    </div>
  );
}

export default Filters;