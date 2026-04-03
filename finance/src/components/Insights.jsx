import React from "react";
import { useStore } from "../store/useStore";
import {
  formatCurrency,
  getFinancialSummary,
  getMonthlyExpenseComparison,
  getTopSpendingCategory,
} from "../utils/finance";

const Insights = () => {
  const { transactions } = useStore();
  const summary = getFinancialSummary(transactions);
  const topCategory = getTopSpendingCategory(transactions);
  const monthComparison = getMonthlyExpenseComparison(transactions);

  const savingsRate = summary.income
    ? Math.round(((summary.income - summary.expense) / summary.income) * 100)
    : 0;

  const observation =
    savingsRate >= 30
      ? "Strong savings momentum this quarter."
      : savingsRate >= 10
        ? "Spending is manageable, but there is room to optimize fixed costs."
        : "Spending is close to income. Reducing top discretionary categories may help.";

  return (
    <div className="grid gap-4 md:grid-cols-3 md:gap-5">
      <article className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-200">Highest Spending Category</p>
        <p className="mt-3 text-xl font-bold text-slate-900 dark:text-slate-50">{topCategory.category}</p>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-100">{formatCurrency(topCategory.amount)} total outflow</p>
      </article>

      <article className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-200">Monthly Expense Comparison</p>
        <p className="mt-3 text-xl font-bold text-slate-900 dark:text-slate-50">
          {monthComparison.trend === "down" ? "Decreased" : monthComparison.trend === "up" ? "Increased" : "Flat"}
        </p>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-100">
          Current: {formatCurrency(monthComparison.current)} | Previous: {formatCurrency(monthComparison.previous)}
        </p>
      </article>

      <article className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-200">Useful Observation</p>
        <p className="mt-3 text-xl font-bold text-slate-900 dark:text-slate-50">Savings rate: {savingsRate}%</p>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-100">{observation}</p>
      </article>
    </div>
  );
};

export default Insights;