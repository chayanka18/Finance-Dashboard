import { create } from "zustand";

export const useStore = create((set) => ({
  // 🔹 Role (RBAC simulation)
  role: "viewer", // viewer | admin
  setRole: (role) => set({ role }),

  // 🔹 Transactions data
  transactions: [
    {
      id: 1,
      date: "2026-03-01",
      amount: 5000,
      category: "Salary",
      type: "income",
    },
    {
      id: 2,
      date: "2026-03-02",
      amount: 1200,
      category: "Food",
      type: "expense",
    },
    {
      id: 3,
      date: "2026-03-03",
      amount: 800,
      category: "Transport",
      type: "expense",
    },
  ],

  // 🔹 Add transaction (admin use)
  addTransaction: (newTx) =>
    set((state) => ({
      transactions: [...state.transactions, newTx],
    })),

  // 🔹 Filters
  filter: "all", // all | income | expense
  setFilter: (filter) => set({ filter }),

  // 🔹 Search
  searchTerm: "",
  setSearchTerm: (term) => set({ searchTerm: term }),

  // 🔹 Sorting
  sortBy: "none", // none | amount | date
  setSortBy: (type) => set({ sortBy: type }),
}));