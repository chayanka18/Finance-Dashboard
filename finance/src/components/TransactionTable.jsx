import React from "react";
import { formatCurrency, formatDate } from "../utils/finance";

const TransactionTable = ({ transactions, canEdit, onEdit, darkMode = false }) => {
  if (!transactions.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white/80 px-4 py-12 text-center dark:border-slate-700 dark:bg-slate-900/70">
        <p className="text-lg font-semibold text-slate-700 dark:text-slate-100">No transactions match your filters</p>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-100">Try changing search, type, or sorting options.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
      <table className="min-w-full text-left text-sm text-slate-700 dark:text-slate-100">
        <thead>
          <tr className="bg-slate-50/80 text-xs uppercase tracking-[0.14em] text-slate-500 dark:bg-slate-800/70 dark:text-slate-200">
            <th className="px-5 py-4">Date</th>
            <th className="px-5 py-4">Category</th>
            <th className="px-10 py-4">Type</th>
            <th className="px-5 py-4 text-right">Amount</th>
            {canEdit ? <th className="px-5 py-4 text-right">Action</th> : null}
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx, index) => (
            <tr
              key={tx.id}
              className={`border-t border-slate-200 transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800/60 ${
                index % 2 === 0 ? "" : "bg-slate-50/70 dark:bg-slate-800/40"
              }`}
            >
              <td className="px-5 py-4 font-medium text-slate-800 dark:text-slate-50">{formatDate(tx.date)}</td>
              <td className="px-5 py-4 text-slate-800 dark:text-slate-50">{tx.category}</td>
              <td className="px-5 py-4">
                <span
                  className={`rounded-full px-5 py-1 text-xs font-semibold ${
                    tx.type === "income"
                      ? "bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-200"
                      : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200"
                  }`}
                >
                  {tx.type === "income" ? "income" : "expense"}
                </span>
              </td>
              <td className={`px-5 py-4 text-right font-bold ${tx.type === "income" ? "text-sky-700 dark:text-sky-200" : "text-amber-700 dark:text-amber-200"}`}>
                {tx.type === "income" ? "+" : "-"}
                {formatCurrency(tx.amount)}
              </td>
              {canEdit ? (
                <td className="px-5 py-4 text-right">
                  <button
                    type="button"
                    onClick={() => onEdit(tx)}
                    className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-500 dark:text-slate-100 dark:hover:bg-slate-700"
                  >
                    Edit
                  </button>
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;