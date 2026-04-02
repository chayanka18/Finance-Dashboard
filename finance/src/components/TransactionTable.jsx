import React from "react";
import { useStore } from "../store/useStore";

const TransactionTable = ({ darkMode }) => {
  const { transactions, filter, searchTerm, sortBy } = useStore();

  let filteredTransactions = transactions.filter((tx) => {
    return (filter === "all" || tx.type === filter) &&
           (searchTerm === "" || tx.category.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  if (sortBy === "amount") {
    filteredTransactions.sort((a, b) => b.amount - a.amount);
  } else if (sortBy === "date") {
    filteredTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  return (
    <div className="overflow-x-auto">
      <table className={`min-w-full text-left border ${darkMode ? "text-white" : "text-gray-900"}`}>
        <thead>
          <tr className={`${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((tx, idx) => (
              <tr
                key={tx.id}
                className={`border-b ${darkMode
                  ? idx % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                  : idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:${darkMode ? "bg-gray-600" : "bg-gray-100"}`}
              >
                <td className="px-4 py-2">{tx.date}</td>
                <td className="px-4 py-2">{tx.category}</td>
                <td className="px-4 py-2">{tx.type}</td>
                <td className="px-4 py-2">₹{tx.amount}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center text-gray-400 py-4">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;