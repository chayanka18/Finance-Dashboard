import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useStore } from "../../store/useStore";

const ExpenseLineChart = () => {
  const { transactions } = useStore();

  // Group expenses by date
  const dataMap = {};
  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      if (dataMap[t.date]) dataMap[t.date] += t.amount;
      else dataMap[t.date] = t.amount;
    });

  const data = Object.keys(dataMap)
    .sort() // ascending dates
    .map((date) => ({ date, expense: dataMap[date] }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip formatter={(value) => `₹${value}`} />
        <Legend />
        <Line
          type="monotone"
          dataKey="expense"
          stroke="#FF0000"
          activeDot={{ r: 8 }}
          isAnimationActive={true}
          animationDuration={800}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ExpenseLineChart;