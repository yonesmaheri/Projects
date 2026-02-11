import { useSelector } from "react-redux";
import { selectIncomeExpenseBalance } from "../store/selectors";
import SummaryItem from "./SummaryItem";
import type { RootState } from "../store/store";

export default function Summary() {
  const { income, expense, balance } = useSelector((state: RootState) =>
    selectIncomeExpenseBalance(state),
  );

  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4">
      <SummaryItem label="Income" value={income} color="text-green-600" />
      <SummaryItem label="Expense" value={expense} color="text-red-600" />
      <SummaryItem label="Balance" value={balance} color="text-slate-800" />
    </div>
  );
}


