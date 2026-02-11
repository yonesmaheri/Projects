import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useSelector } from "react-redux";
import { selectCategoryTotals } from "../../store/selectors";
import type { RootState } from "../../store/store";

const chartColors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A855F7"];

export default function CategoryPieChart() {
  const categoryTotals = useSelector((state: RootState) =>
    selectCategoryTotals(state),
  );

  const data = Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value,
  }));

  if (!data.length) {
    return <p className="text-center text-gray-500">No data for chart</p>;
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow h-[320px] sm:h-[360px]">
      <h2 className="text-center font-semibold mb-4">
        Pie Chart Expenses by Category
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={90}
            label
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={chartColors[index % chartColors.length]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}


