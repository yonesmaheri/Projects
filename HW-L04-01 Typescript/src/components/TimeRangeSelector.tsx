import { useDispatch, useSelector } from "react-redux";
import { setTimeRange } from "../store/expenseSlice";
import type { RootState, AppDispatch } from "../store/store";
import type { TimeRange } from "../store/expenseSlice";

const ranges: { key: TimeRange; label: string }[] = [
  { key: "minute", label: "Minute" },
  { key: "hour", label: "Hour" },
  { key: "day", label: "Day" },
];

export default function TimeRangeSelector() {
  const dispatch = useDispatch<AppDispatch>();
  const timeRange = useSelector(
    (state: RootState) => state.expense.timeRange,
  );

  return (
    <div className="flex justify-center">
      <div className="inline-flex bg-slate-100 rounded-xl p-1 shadow-sm">
        {ranges.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => dispatch(setTimeRange(key))}
            className={`px-4 py-1.5 text-sm rounded-lg transition-all ${
              timeRange === key
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}


