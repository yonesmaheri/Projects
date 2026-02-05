import { useExpense } from "../context/ExpenseContext";

export default function TransactionFilters() {
  const {
    searchQuery,
    setSearchQuery,
    categories,
    selectedCategory,
    setSelectedCategory,
    dateRange,
    setDateRange,
    resetFilters,
  } = useExpense();

  return (
    <div className="bg-white/80 backdrop-blur p-4 rounded-2xl shadow-sm space-y-3">
      <input
        placeholder="Search by title or amount"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full bg-slate-50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:bg-white focus:ring-1 focus:ring-slate-200"
      />

      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="w-full bg-slate-50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:bg-white focus:ring-1 focus:ring-slate-200"
      >
        <option value="all">All Categories</option>
        {categories.map((category) => (
          <option key={category}>{category}</option>
        ))}
      </select>

      <div className="flex gap-2">
        <input
          type="date"
          value={dateRange.from}
          onChange={(e) =>
            setDateRange((prev) => ({
              ...prev,
              from: e.target.value,
            }))
          }
          className="flex-1 bg-slate-50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:bg-white focus:ring-1 focus:ring-slate-200"
        />

        <input
          type="date"
          value={dateRange.to}
          onChange={(e) =>
            setDateRange((prev) => ({
              ...prev,
              to: e.target.value,
            }))
          }
          className="flex-1 bg-slate-50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:bg-white focus:ring-1 focus:ring-slate-200"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={resetFilters}
          className="text-xs text-slate-500 hover:text-slate-700 shadow-md p-2 rounded-lg bg-red-100/50 transition"
        >
          Reset filters
        </button>
      </div>
    </div>
  );
}
