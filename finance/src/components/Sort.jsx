import React from "react";
import { useStore } from "../store/useStore";

const Sort = () => {
  const { sortBy, setSortBy } = useStore();

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sortBy" className="text-sm font-semibold text-slate-600 dark:text-slate-50">
        Sort
      </label>
      <select
        id="sortBy"
        value={sortBy}
        onChange={(event) => setSortBy(event.target.value)}
        className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:border-sky-500 focus:outline-none dark:border-slate-600 dark:bg-slate-900 dark:text-slate-50"
      >
        <option value="date-desc">Newest first</option>
        <option value="date-asc">Oldest first</option>
        <option value="amount-desc">Highest amount</option>
        <option value="amount-asc">Lowest amount</option>
        <option value="category-asc">Category A-Z</option>
      </select>
    </div>
  );
};

export default Sort;