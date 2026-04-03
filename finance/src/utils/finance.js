export const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export const formatCurrency = (amount = 0) => currencyFormatter.format(Number(amount) || 0);

const parseDateInput = (input) => {
  if (input instanceof Date) return input;
  if (typeof input !== "string") return new Date(input);

  const parts = input.split("-");
  if (parts.length === 3) {
    const [year, month, day] = parts.map(Number);
    return new Date(year, month - 1, day);
  }

  return new Date(input);
};

export const formatDate = (input) => {
  const date = parseDateInput(input);
  if (Number.isNaN(date.getTime())) return "Invalid date";
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const getFinancialSummary = (transactions) => {
  const totals = transactions.reduce(
    (acc, tx) => {
      if (tx.type === "income") acc.income += tx.amount;
      if (tx.type === "expense") acc.expense += tx.amount;
      return acc;
    },
    { income: 0, expense: 0 },
  );

  return {
    income: totals.income,
    expense: totals.expense,
    balance: totals.income - totals.expense,
  };
};

export const getTopSpendingCategory = (transactions) => {
  const grouped = transactions
    .filter((tx) => tx.type === "expense")
    .reduce((acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
      return acc;
    }, {});

  const top = Object.entries(grouped).sort((a, b) => b[1] - a[1])[0];
  if (!top) return { category: "No expenses yet", amount: 0 };

  return {
    category: top[0],
    amount: top[1],
  };
};

export const getMonthlyExpenseComparison = (transactions) => {
  const monthlyTotals = transactions
    .filter((tx) => tx.type === "expense")
    .reduce((acc, tx) => {
      const date = parseDateInput(tx.date);
      if (Number.isNaN(date.getTime())) return acc;

      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      acc[key] = (acc[key] || 0) + tx.amount;
      return acc;
    }, {});

  const keys = Object.keys(monthlyTotals).sort();
  if (!keys.length) {
    return { current: 0, previous: 0, difference: 0, trend: "flat" };
  }

  const currentKey = keys[keys.length - 1];
  const previousKey = keys[keys.length - 2];

  const current = monthlyTotals[currentKey] || 0;
  const previous = previousKey ? monthlyTotals[previousKey] || 0 : 0;

  return {
    current,
    previous,
    difference: current - previous,
    trend: current > previous ? "up" : current < previous ? "down" : "flat",
  };
};

export const getBalanceTrendData = (transactions) => {
  const ordered = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
  let runningBalance = 0;

  return ordered.map((tx) => {
    runningBalance += tx.type === "income" ? tx.amount : -tx.amount;
    return {
      date: tx.date,
      label: new Date(tx.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short" }),
      balance: runningBalance,
      amount: tx.amount,
      type: tx.type,
    };
  });
};

export const getMonthlyFlowData = (transactions) => {
  const grouped = transactions.reduce((acc, tx) => {
    const date = parseDateInput(tx.date);
    if (Number.isNaN(date.getTime())) return acc;

    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    if (!acc[key]) {
      acc[key] = {
        monthKey: key,
        monthLabel: date.toLocaleDateString("en-IN", { month: "short", year: "2-digit" }),
        income: 0,
        expense: 0,
      };
    }

    if (tx.type === "income") acc[key].income += tx.amount;
    if (tx.type === "expense") acc[key].expense += tx.amount;
    return acc;
  }, {});

  const ordered = Object.values(grouped).sort((a, b) => a.monthKey.localeCompare(b.monthKey));
  if (!ordered.length) return [];

  // Keep chart focused on recent activity to avoid very old persisted entries distorting the flow.
  const latest = ordered[ordered.length - 1].monthKey;
  const [latestYear, latestMonth] = latest.split("-").map(Number);

  const monthWindow = [];
  for (let index = 5; index >= 0; index -= 1) {
    const date = new Date(latestYear, latestMonth - 1 - index, 1);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    monthWindow.push(key);
  }

  const normalized = monthWindow.map((key) => {
    const [year, month] = key.split("-").map(Number);
    const existing = grouped[key];

    return (
      existing || {
        monthKey: key,
        monthLabel: new Date(year, month - 1, 1).toLocaleDateString("en-IN", {
          month: "short",
          year: "numeric",
        }),
        income: 0,
        expense: 0,
      }
    );
  });

  let runningBalance = 0;

  return normalized.map((item) => {
    runningBalance += item.income - item.expense;
    return {
      ...item,
      net: item.income - item.expense,
      balance: runningBalance,
    };
  });
};

export const getExpenseBreakdownData = (transactions) => {
  const grouped = transactions
    .filter((tx) => tx.type === "expense")
    .reduce((acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
      return acc;
    }, {});

  return Object.entries(grouped)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
};
