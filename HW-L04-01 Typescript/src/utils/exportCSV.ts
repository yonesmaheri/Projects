import type { Transaction } from "../store/expenseSlice";

export function exportTransactionsToCSV(transactions: Transaction[]): void {
  if (!transactions.length) return;

  const headers = ["Title", "Amount", "Category", "Date", "Type"];

  const rows = transactions.map((t) => [
    t.title,
    t.amount,
    t.category,
    t.date,
    t.type,
  ]);

  const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join(
    "\n",
  );

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "transactions.csv";
  link.click();

  URL.revokeObjectURL(url);
}


