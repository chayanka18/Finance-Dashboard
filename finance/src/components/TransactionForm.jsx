import React, { useState } from "react";

const TransactionForm = ({ onSubmit, onClose, initialData = null }) => {
  const [form, setForm] = useState({
    date: initialData?.date || "",
    category: initialData?.category || "",
    type: initialData?.type || "income",
    amount: initialData?.amount ?? "",
  });

  const [error, setError] = useState("");

  const isEditing = Boolean(initialData);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const amount = Number(form.amount);
    if (!form.date || !form.category.trim() || Number.isNaN(amount) || amount <= 0) {
      setError("Please fill all fields with valid values.");
      return;
    }

    onSubmit({
      ...form,
      category: form.category.trim(),
      amount,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm">
      <form className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-700 dark:bg-slate-900" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          {isEditing ? "Edit transaction" : "Add transaction"}
        </h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          {isEditing ? "Update transaction details and save." : "Create a new income or expense record."}
        </p>

        <div className="mt-5 space-y-3">
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-700 outline-none focus:border-sky-500 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-700 outline-none focus:border-sky-500 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
            required
          />
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-700 outline-none focus:border-sky-500 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
          >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
          </select>
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            min="1"
            value={form.amount}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-700 outline-none focus:border-sky-500 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
            required
          />
        </div>

        {error ? <p className="mt-3 text-sm font-medium text-rose-600">{error}</p> : null}

        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Cancel
          </button>
          <button type="submit" className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200">
            {isEditing ? "Save changes" : "Add transaction"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;