import CategoryPieChart from "../components/Charts/CategoryPieChart";
import IncomeExpenseLineChart from "../components/Charts/IncomeExpenseLineChart";
import ExportButtons from "../components/ExportButtons";
import Summary from "../components/Summary";
import TimeRangeSelector from "../components/TimeRangeSelector";
import TransactionFilters from "../components/TransactionFilters";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-center">Expense Tracker</h1>

      <Summary />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10! ">
        <div className="lg:col-span-1">
          <TransactionForm />
        </div>

        <div className="lg:col-span-2 space-y-3">
          <ExportButtons />
          <TransactionFilters />
          <TransactionList />
        </div>
      </div>
      <TimeRangeSelector />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryPieChart />
        <IncomeExpenseLineChart />
      </div>
    </div>
  );
}
