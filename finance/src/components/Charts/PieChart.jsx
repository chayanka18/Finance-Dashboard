import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useStore } from "../../store/useStore";
import { formatCurrency, getExpenseBreakdownData } from "../../utils/finance";

// Okabe-Ito inspired colorblind-safe palette.
const COLORS = ["#0072B2", "#E69F00", "#009E73", "#D55E00", "#CC79A7", "#56B4E9", "#F0E442", "#999999"];

const ExpensePieChart = ({ darkMode = false }) => {
  const { transactions } = useStore();
  const data = getExpenseBreakdownData(transactions);

  if (!data.length) {
    return <p className="px-2 py-12 text-center text-sm text-slate-500">No expense data yet for category breakdown.</p>;
  }

  const total = data.reduce((sum, item) => sum + item.value, 0);

  const renderLabel = ({ cx, cy, midAngle, outerRadius, percent, name }) => {
    if (percent === 0) return null;

    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 18;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill={darkMode ? "#e2e8f0" : "#334155"}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={12}
        fontWeight="600"
      >
        {`${name} ${Math.round(percent * 100)}%`}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="46%"
          outerRadius={100}
          labelLine={false}
          label={renderLabel}
          isAnimationActive={true}
          animationDuration={700}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="#ffffff" strokeWidth={2} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: darkMode ? "#0f172a" : "#ffffff",
            border: `1px solid ${darkMode ? "#334155" : "#e2e8f0"}`,
            borderRadius: "12px",
            color: darkMode ? "#f8fafc" : "#0f172a",
          }}
          formatter={(value) => formatCurrency(value)}
          labelFormatter={(name) => {
            const item = data.find((entry) => entry.name === name);
            if (!item || !total) return name;
            return `${name} (${Math.round((item.value / total) * 100)}%)`;
          }}
        />
        <Legend
          verticalAlign="bottom"
          height={76}
          wrapperStyle={{
            color: darkMode ? "#e2e8f0" : "#334155",
            paddingTop: "10px",
            lineHeight: "1.45",
          }}
          formatter={(value, entry, index) => `${index + 1}. ${value}`}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ExpensePieChart;