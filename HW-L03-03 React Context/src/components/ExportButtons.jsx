import { useExpense } from "../context/ExpenseContext";
import { exportTransactionsToCSV } from "../utils/exportCSV";
import { exportTransactionsToPDF } from "../utils/exportPDF";
import { importTransactionsFromCSV } from "../utils/importCSV";

export default function ExportButtons() {
  const { transactions, importTransactions } = useExpense();

  return (
    <div className="flex gap-2">
      <button
        onClick={() => exportTransactionsToCSV(transactions)}
        className="text-sm px-3 py-2 rounded-lg bg-slate-200 text-slate-700 hover:bg-slate-300"
      >
        Export CSV
      </button>

      <label className="text-sm px-3 py-2 rounded-lg bg-slate-200 text-slate-700 hover:bg-slate-300 cursor-pointer">
        Import CSV
        <input
          type="file"
          accept=".csv"
          hidden
          onChange={(e) =>
            importTransactionsFromCSV(e.target.files[0], importTransactions)
          }
        />
      </label>

      <button
        onClick={() => exportTransactionsToPDF(transactions)}
        className="text-sm px-3 py-2 rounded-lg bg-slate-200
             text-slate-700 hover:bg-slate-300"
      >
        Export PDF
      </button>
    </div>
  );
}
