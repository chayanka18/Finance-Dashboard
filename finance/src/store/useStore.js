import { create } from "zustand";
import { persist } from "zustand/middleware";

const seedTransactions = [
  { id: 1, date: "2026-01-04", amount: 78000, category: "Salary", type: "income" },
  { id: 2, date: "2026-01-09", amount: 3600, category: "Groceries", type: "expense" },
  { id: 3, date: "2026-01-12", amount: 1500, category: "Transport", type: "expense" },
  { id: 4, date: "2026-01-18", amount: 4200, category: "Utilities", type: "expense" },
  { id: 5, date: "2026-02-04", amount: 78000, category: "Salary", type: "income" },
  { id: 6, date: "2026-02-08", amount: 19000, category: "Freelance", type: "income" },
  { id: 7, date: "2026-02-16", amount: 8200, category: "Rent", type: "expense" },
  { id: 8, date: "2026-02-22", amount: 2700, category: "Entertainment", type: "expense" },
  { id: 9, date: "2026-03-04", amount: 78000, category: "Salary", type: "income" },
  { id: 10, date: "2026-03-10", amount: 3100, category: "Dining", type: "expense" },
  { id: 11, date: "2026-03-15", amount: 9000, category: "Travel", type: "expense" },
  { id: 12, date: "2026-03-23", amount: 2200, category: "Healthcare", type: "expense" },
];

export const useStore = create(
  persist(
    (set, get) => ({
      role: "viewer",
      setRole: (role) => set({ role }),

      transactions: seedTransactions,

      addTransaction: (transaction) => {
        const nextId = get().transactions.reduce((maxId, item) => Math.max(maxId, item.id), 0) + 1;
        set((state) => ({
          transactions: [...state.transactions, { ...transaction, id: nextId }],
        }));
      },

      updateTransaction: (id, updates) =>
        set((state) => ({
          transactions: state.transactions.map((item) =>
            item.id === id ? { ...item, ...updates } : item,
          ),
        })),

      resetTransactions: () =>
        set({
          transactions: seedTransactions,
        }),

      filter: "all",
      setFilter: (filter) => set({ filter }),

      searchTerm: "",
      setSearchTerm: (searchTerm) => set({ searchTerm }),

      sortBy: "date-desc",
      setSortBy: (sortBy) => set({ sortBy }),

      resetFilters: () =>
        set({
          filter: "all",
          searchTerm: "",
          sortBy: "date-desc",
        }),
    }),
    {
      name: "finance-dashboard-state",
      partialize: (state) => ({
        role: state.role,
        transactions: state.transactions,
      }),
    },
  ),
);