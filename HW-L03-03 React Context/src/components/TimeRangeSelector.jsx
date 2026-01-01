import { useExpense } from "../context/ExpenseContext";

const ranges = [
  { key: "minute", label: "Minute" },
  { key: "hour", label: "Hour" },
  { key: "day", label: "Day" },
];

export default function TimeRangeSelector() {
  const { timeRange, setTimeRange } = useExpense();

  return (
    <div className="flex justify-center">
      <div className="inline-flex bg-slate-100 rounded-xl p-1 shadow-sm">
        {ranges.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setTimeRange(key)}
            className={`px-4 py-1.5 text-sm rounded-lg transition-all
              ${
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
