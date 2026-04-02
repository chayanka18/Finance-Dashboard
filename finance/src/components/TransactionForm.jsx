import React, { useState } from "react";

const TransactionForm = ({ onSubmit, onClose }) => {
  const [form, setForm] = useState({
    date: "",
    category: "",
    type: "income",
    amount: "",
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({
      ...form,
      amount: Number(form.amount)
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <form className="bg-white p-6 rounded shadow-lg w-80" onSubmit={handleSubmit}>
        <h2 className="text-lg font-bold mb-4">Add Transaction</h2>
        <input type="date" name="date" value={form.date} onChange={handleChange} className="mb-2 w-full px-2 py-1 border rounded" required />
        <input type="text" name="category" placeholder="Category" value={form.category} onChange={handleChange} className="mb-2 w-full px-2 py-1 border rounded" required />
        <select name="type" value={form.type} onChange={handleChange} className="mb-2 w-full px-2 py-1 border rounded">
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <input type="number" name="amount" placeholder="Amount" value={form.amount} onChange={handleChange} className="mb-4 w-full px-2 py-1 border rounded" required />
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Add</button>
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;