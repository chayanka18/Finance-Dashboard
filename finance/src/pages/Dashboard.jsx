import React, { useState } from "react";
import SummaryCard from "../components/SummaryCard";
import TransactionTable from "../components/TransactionTable";
import Filters from "../components/Filters";
import RoleSwitcher from "../components/RoleSwitcher";
import SearchBar from "../components/SearchBar";
import Sort from "../components/Sort";
import Insights from "../components/Insights";
import IncomeExpensePieChart from "../components/Charts/PieChart";
import ExpenseLineChart from "../components/Charts/LineChart";
import TransactionForm from "../components/TransactionForm";
import { useStore } from "../store/useStore";

const Dashboard = () => {
  const { transactions, role, addTransaction } = useStore();
  const [showModal, setShowModal] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = totalIncome - totalExpense;

  const handleAddTransaction = (tx) => {
    const newTx = { id: transactions.length + 1, ...tx };
    addTransaction(newTx);
  };

  const exportCSV = () => {
    const headers = ["Date", "Category", "Type", "Amount"];
    const rows = transactions.map(t => [t.date, t.category, t.type, t.amount]);
    let csvContent = "data:text/csv;charset=utf-8," 
        + [headers, ...rows].map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} p-4 md:p-6 min-h-screen`}>
      {/* Title + Dark Mode */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl md:text-3xl font-bold">Finance Dashboard</h1>
        <button
          className="px-3 py-1 border rounded"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {/* Role Switcher */}
      <div className="mb-4">
        <RoleSwitcher />
      </div>

      {/* Admin Add / Export */}
      {role === "admin" && (
        <div className="mb-4 flex gap-2">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={() => setShowModal(true)}
          >
            Add Transaction
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={exportCSV}
          >
            Export CSV
          </button>
        </div>
      )}

      {/* Transaction Form Modal */}
      {showModal && (
        <TransactionForm
          onSubmit={handleAddTransaction}
          onClose={() => setShowModal(false)}
          darkMode={darkMode}
        />
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <SummaryCard title="Total Balance" amount={balance} color="bg-green-500" darkMode={darkMode}/>
        <SummaryCard title="Income" amount={totalIncome} color="bg-blue-500" darkMode={darkMode}/>
        <SummaryCard title="Expenses" amount={totalExpense} color="bg-red-500" darkMode={darkMode}/>
      </div>

      {/* Filters + Search + Sort */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <Filters darkMode={darkMode} />
        <SearchBar darkMode={darkMode}/>
        <Sort darkMode={darkMode}/>
      </div>

      {/* Insights Cards */}
      <Insights darkMode={darkMode}/>

      {/* Charts */}
      <div className="flex flex-col md:flex-row gap-6 my-6">
        <div className={`${darkMode ? "bg-gray-800" : "bg-white"} flex-1 p-4 rounded-xl shadow-md`}>
          <h2 className="text-lg font-semibold mb-2">Income vs Expense</h2>
          <IncomeExpensePieChart darkMode={darkMode}/>
        </div>
        <div className={`${darkMode ? "bg-gray-800" : "bg-white"} flex-1 p-4 rounded-xl shadow-md`}>
          <h2 className="text-lg font-semibold mb-2">Expense Trend</h2>
          <ExpenseLineChart darkMode={darkMode}/>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="mt-6 overflow-x-auto">
        <TransactionTable darkMode={darkMode}/>
      </div>
    </div>
  );
};

export default Dashboard;