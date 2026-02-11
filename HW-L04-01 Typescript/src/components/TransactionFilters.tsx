import { useDispatch, useSelector } from "react-redux";
import {
  setSearchQuery,
  setSelectedCategory,
  setDateRange,
  resetFilters,
} from "../store/expenseSlice";
import type { AppDispatch, RootState } from "../store/store";

export default function TransactionFilters() {
  const dispatch = useDispatch<AppDispatch>();

  const {
    searchQuery,
    categories,
    selectedCategory,
    dateRange,
  } = useSelector((state: RootState) => state.expense);

  return (
    <div className="bg-white/80 backdrop-blur p-4 rounded-2xl shadow-sm space-y-3">
      <input
        placeholder="Search by title or amount"
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        className="w-full bg-slate-50 rounded-lg px-3 py-2 text-sm"
      />

      <select
        value={selectedCategory}
        onChange={(e) =>
          dispatch(setSelectedCategory(e.target.value))
        }
        className="w-full bg-slate-50 rounded-lg px-3 py-2 text-sm"
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
            dispatch(
              setDateRange({
                ...dateRange,
                from: e.target.value,
              }),
            )
          }
          className="flex-1 bg-slate-50 rounded-lg px-3 py-2 text-sm"
        />

        <input
          type="date"
          value={dateRange.to}
          onChange={(e) =>
            dispatch(
              setDateRange({
                ...dateRange,
                to: e.target.value,
              }),
            )
          }
          className="flex-1 bg-slate-50 rounded-lg px-3 py-2 text-sm"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => dispatch(resetFilters())}
          className="text-xs text-slate-500 bg-red-100/50 p-2 rounded-lg"
        >
          Reset filters
        </button>
      </div>
    </div>
  );
}


