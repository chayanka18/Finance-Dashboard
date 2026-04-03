import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import SummaryCard from "../components/SummaryCard";
import TransactionTable from "../components/TransactionTable";
import Filters from "../components/Filters";
import RoleSwitcher from "../components/RoleSwitcher";
import SearchBar from "../components/SearchBar";
import Sort from "../components/Sort";
import Insights from "../components/Insights";
import ExpensePieChart from "../components/Charts/PieChart";
import BalanceLineChart from "../components/Charts/LineChart";
import TransactionForm from "../components/TransactionForm";
import { useStore } from "../store/useStore";
import { formatCurrency, getFinancialSummary } from "../utils/finance";

const Dashboard = () => {
  const {
    transactions,
    role,
    addTransaction,
    updateTransaction,
    resetTransactions,
    filter,
    searchTerm,
    sortBy,
  } = useStore();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState("create");
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const summary = useMemo(() => getFinancialSummary(transactions), [transactions]);

  const filteredTransactions = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    const result = transactions.filter((tx) => {
      const matchesFilter = filter === "all" || tx.type === filter;
      const matchesSearch =
        !query ||
        tx.category.toLowerCase().includes(query) ||
        tx.type.toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });

    result.sort((a, b) => {
      if (sortBy === "date-asc") return new Date(a.date) - new Date(b.date);
      if (sortBy === "date-desc") return new Date(b.date) - new Date(a.date);
      if (sortBy === "amount-asc") return a.amount - b.amount;
      if (sortBy === "amount-desc") return b.amount - a.amount;
      if (sortBy === "category-asc") return a.category.localeCompare(b.category);
      return 0;
    });

    return result;
  }, [transactions, filter, searchTerm, sortBy]);

  const openCreateForm = () => {
    setFormMode("create");
    setEditingTransaction(null);
    setIsFormOpen(true);
  };

  const openEditForm = (transaction) => {
    setFormMode("edit");
    setEditingTransaction(transaction);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setEditingTransaction(null);
    setIsFormOpen(false);
  };

  const handleSubmitTransaction = (payload) => {
    if (formMode === "edit" && editingTransaction) {
      updateTransaction(editingTransaction.id, payload);
      return;
    }
    addTransaction(payload);
  };

  const exportCSV = () => {
    const headers = ["Date", "Category", "Type", "Amount"];
    const rows = filteredTransactions.map((tx) => [
      tx.date,
      tx.category,
      tx.type,
      tx.amount,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((row) => row.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.href = encodedUri;
    link.download = "finance-transactions.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <main className="min-h-screen bg-gray-100 px-4 pb-12 pt-7 text-slate-900 transition-colors duration-300 dark:bg-gray-950 dark:text-white md:px-8 md:pt-8">
        <div className="mx-auto max-w-7xl space-y-7 md:space-y-8">

          {/* 🔷 HEADER */}
          <motion.header
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border bg-white/80 p-6 shadow-lg backdrop-blur-lg dark:border-slate-700 dark:bg-slate-900/70 md:p-7"
          >
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div>
                <h1 className="text-3xl font-bold">
                  Finance Dashboard
                </h1>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
                  Track, analyze and manage your finances
                </p>
              </div>

              <button
                onClick={() => setDarkMode(!darkMode)}
                className="flex items-center gap-2 rounded-xl border bg-white px-4 py-2 font-medium hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 transition"
              >
                {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
              </button>
            </div>
          </motion.header>

          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.03 }}
          >
            <RoleSwitcher />
          </motion.section>

          {/* 🔷 SUMMARY */}
          <div className="grid gap-4 md:grid-cols-3 md:gap-5">
            <SummaryCard title="Balance" amount={summary.balance} />
            <SummaryCard title="Income" amount={summary.income} />
            <SummaryCard title="Expense" amount={summary.expense} />
          </div>

          {/* 🔷 ADMIN ACTIONS */}
          {role === "admin" && (
            <div className="rounded-2xl border bg-white/80 p-5 shadow backdrop-blur-lg dark:border-slate-700 dark:bg-slate-900/70">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <p className="text-sm text-slate-500 dark:text-slate-300">
                  Manage transactions
                </p>

                <div className="flex flex-wrap gap-2.5">
                  <button
                    onClick={openCreateForm}
                    className="rounded-xl bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                  >
                    ➕ Add
                  </button>

                  <button
                    onClick={exportCSV}
                    className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
                  >
                    ⬇ Export
                  </button>

                  <button
                    onClick={resetTransactions}
                    className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
                  >
                    ♻ Reset
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 🔷 FORM */}
          {isFormOpen && (
            <TransactionForm
              onSubmit={handleSubmitTransaction}
              onClose={closeForm}
              initialData={editingTransaction}
            />
          )}

          {/* 🔷 INSIGHTS */}
          <Insights />

          {/* 🔷 CHARTS */}
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border bg-white/80 p-6 shadow backdrop-blur-lg dark:border-slate-700 dark:bg-slate-900/70">
              <h2 className="mb-5 text-lg font-semibold">Balance Trend</h2>
              <BalanceLineChart />
            </div>

            <div className="rounded-2xl border bg-white/80 p-6 shadow backdrop-blur-lg dark:border-slate-700 dark:bg-slate-900/70">
              <h2 className="mb-5 text-lg font-semibold">Spending Breakdown</h2>
              <ExpensePieChart />
            </div>
          </div>

          {/* 🔷 FILTERS */}
          <div className="flex flex-wrap justify-between gap-4 rounded-2xl border bg-white/80 p-5 shadow backdrop-blur-lg dark:border-slate-700 dark:bg-slate-900/70">
            <Filters />
            <SearchBar />
            <Sort />
          </div>

          {/* 🔷 TABLE */}
          <div className="rounded-2xl border bg-white shadow dark:bg-slate-900 dark:border-slate-700">
            <TransactionTable
              transactions={filteredTransactions}
              canEdit={role === "admin"}
              onEdit={openEditForm}
              darkMode={darkMode}
            />
          </div>

          {/* 🔷 FOOTER */}
          <footer className="text-sm text-slate-500 dark:text-slate-400">
            Current Balance: {formatCurrency(summary.balance)}
          </footer>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;