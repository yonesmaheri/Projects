import type { Transaction } from "../store/expenseSlice";

export function importTransactionsFromCSV(
  file: File,
  onLoad: (transactions: Transaction[]) => void,
): void {
  const reader = new FileReader();

  reader.onload = (e: ProgressEvent<FileReader>) => {
    const text = e.target?.result;
    if (typeof text !== "string") return;

    const lines = text.split("\n").slice(1);

    const transactions: Transaction[] = lines
      .filter(Boolean)
      .map((line) => {
        const [title, amount, category, date] = line.split(",");

        return {
          id: crypto.randomUUID(),
          title,
          amount: Number(amount),
          category,
          date,
        };
      });

    onLoad(transactions);
  };

  reader.readAsText(file);
}


