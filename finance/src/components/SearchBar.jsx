import React from "react";
import { useStore } from "../store/useStore";

const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useStore();

  return (
    <label className="flex w-full items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 md:w-80 dark:border-slate-600 dark:bg-slate-900">
      <span className="text-slate-400 dark:text-slate-50">Search</span>
      <input
        type="text"
        placeholder="Category or type"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 dark:text-slate-50 dark:placeholder:text-slate-200"
      />
    </label>
  );
};

export default SearchBar;