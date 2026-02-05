import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useExpense } from "../../context/ExpenseContext";

export default function IncomeExpenseLineChart() {
  const { timeSeries } = useExpense();

  if (!timeSeries.length) {
    return <p className="text-center text-gray-500">No data for chart</p>;
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow h-80">
      <h2 className="text-center font-semibold mb-4">
        Line Chart Expense and Income
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={timeSeries}>
          <XAxis
            dataKey="time"
            tickFormatter={(value) => {
              const d = new Date(value);

              if (value.length === 16) {
                return d.toLocaleTimeString("fa-IR", {
                  hour: "2-digit",
                  minute: "2-digit",
                });
              }

              if (value.length === 13) {
                return d.toLocaleTimeString("fa-IR", {
                  hour: "2-digit",
                });
              }

              return d.toLocaleDateString("fa-IR", {
                month: "short",
                day: "numeric",
              });
            }}
            minTickGap={30}
          />
          <YAxis />
          <Tooltip />
          <Legend />

          <Line type="monotone" dataKey="income" dot={{ r: 4 }} />
          <Line type="monotone" dataKey="expense" dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
