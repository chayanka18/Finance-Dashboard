import React from "react";
import { useStore } from "../store/useStore";
import SummaryCard from "./SummaryCard";

const Insights = () => {
  const { transactions } = useStore();

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const numTransactions = transactions.length;

  const avgExpense =
    totalExpense / (transactions.filter((t) => t.type === "expense").length || 1);

  // 🔹 Calculate highest spending category
  const expenseTransactions = transactions.filter((t) => t.type === "expense");
  const categoryTotals = {};
  expenseTransactions.forEach((t) => {
    categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
  });

  let highestCategory = "N/A";
  let highestAmount = 0;
  for (let [cat, amt] of Object.entries(categoryTotals)) {
    if (amt > highestAmount) {
      highestCategory = cat;
      highestAmount = amt;
    }
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 my-6">
      <SummaryCard title="Total Income" amount={totalIncome} color="bg-blue-500" />
      <SummaryCard title="Total Expenses" amount={totalExpense} color="bg-red-500" />
      <SummaryCard title="Transactions" amount={numTransactions} color="bg-purple-500" />
      <SummaryCard title="Avg Expense" amount={Math.round(avgExpense)} color="bg-yellow-500" />
      <SummaryCard
        title="Highest Spending Category"
        amount={highestAmount}
        color="bg-pink-500"
        subtitle={highestCategory}
      />
    </div>
  );
};

export default Insights;