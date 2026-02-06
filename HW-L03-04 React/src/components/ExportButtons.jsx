import { useDispatch, useSelector } from "react-redux";
import { importTransactions } from "../store/expenseSlice";
import { exportTransactionsToCSV } from "../utils/exportCSV";
import { exportTransactionsToPDF } from "../utils/exportPDF";
import { importTransactionsFromCSV } from "../utils/importCSV";

export default function ExportButtons() {
  const dispatch = useDispatch();
  const transactions = useSelector(
    (state) => state.expense.transactions
  );

  return (
    <div className="flex gap-2">
      <button
        onClick={() => exportTransactionsToCSV(transactions)}
        className="text-sm px-3 py-2 rounded-lg bg-slate-200"
      >
        Export CSV
      </button>

      <label className="text-sm px-3 py-2 rounded-lg bg-slate-200 cursor-pointer">
        Import CSV
        <input
          type="file"
          accept=".csv"
          hidden
          onChange={(e) =>
            importTransactionsFromCSV(
              e.target.files?.[0],
              (data) => dispatch(importTransactions(data))
            )
          }
        />
      </label>

      <button
        onClick={() => exportTransactionsToPDF(transactions)}
        className="text-sm px-3 py-2 rounded-lg bg-slate-200"
      >
        Export PDF
      </button>
    </div>
  );
}
