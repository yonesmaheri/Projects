import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { importTransactions } from "../store/expenseSlice";
import { exportTransactionsToCSV } from "../utils/exportCSV";
import { exportTransactionsToPDF } from "../utils/exportPDF";
import { importTransactionsFromCSV } from "../utils/importCSV";
import type { AppDispatch, RootState } from "../store/store";

export default function ExportButtons() {
  const dispatch = useDispatch<AppDispatch>();
  const transactions = useSelector(
    (state: RootState) => state.expense.transactions,
  );

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    importTransactionsFromCSV(file, (data) =>
      dispatch(importTransactions(data)),
    );
  };

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
          onChange={handleFileChange}
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


