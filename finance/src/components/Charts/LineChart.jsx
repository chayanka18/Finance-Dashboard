import React from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useStore } from "../../store/useStore";
import { formatCurrency, getMonthlyFlowData } from "../../utils/finance";

const BalanceLineChart = ({ darkMode = false }) => {
  const { transactions } = useStore();
  const data = getMonthlyFlowData(transactions);

  if (!data.length) {
    return <p className="px-2 py-12 text-center text-sm text-slate-500">No data available for trend analysis.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
        <defs>
          <pattern id="incomePattern" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="8" height="8" fill="#94a3b8" />
            <line x1="0" y1="0" x2="0" y2="8" stroke="#475569" strokeWidth="2" />
          </pattern>
          <pattern id="expensePattern" width="6" height="6" patternUnits="userSpaceOnUse">
            <rect width="6" height="6" fill="#e2e8f0" />
            <circle cx="2" cy="2" r="1" fill="#64748b" />
          </pattern>
        </defs>
        <CartesianGrid strokeDasharray="4 4" stroke={darkMode ? "#334155" : "#cbd5e1"} />
        <XAxis dataKey="monthLabel" tick={{ fontSize: 12, fill: darkMode ? "#e2e8f0" : "#475569" }} />
        <YAxis tickFormatter={(value) => `${Math.round(value / 1000)}k`} tick={{ fontSize: 12, fill: darkMode ? "#e2e8f0" : "#475569" }} />
        <Tooltip
          contentStyle={{
            backgroundColor: darkMode ? "#0f172a" : "#ffffff",
            border: `1px solid ${darkMode ? "#334155" : "#e2e8f0"}`,
            borderRadius: "12px",
            color: darkMode ? "#f8fafc" : "#0f172a",
          }}
          formatter={(value) => formatCurrency(value)}
          labelFormatter={(label) => `Month: ${label}`}
        />
        <Legend wrapperStyle={{ color: darkMode ? "#e2e8f0" : "#334155" }} />
        <Bar dataKey="income" name="Income (striped)" fill="url(#incomePattern)" radius={[6, 6, 0, 0]} />
        <Bar dataKey="expense" name="Expense (dotted)" fill="url(#expensePattern)" radius={[6, 6, 0, 0]} />
        <Line
          type="monotone"
          dataKey="balance"
          stroke={darkMode ? "#f8fafc" : "#334155"}
          strokeWidth={3}
          dot={{ r: 3 }}
          activeDot={{ r: 6 }}
          isAnimationActive={true}
          animationDuration={700}
          name="Running Balance"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default BalanceLineChart;