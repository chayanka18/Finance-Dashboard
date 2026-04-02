import { useStore } from "../store/useStore";

function Filters() {
  const { filter, setFilter } = useStore();

  return (
    <div className="mb-6 flex items-center gap-3">
      <label className="font-semibold text-lg">Filter:</label>

      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="border px-4 py-2 rounded-lg shadow-sm"
      >
        <option value="all">All</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
    </div>
  );
}

export default Filters;