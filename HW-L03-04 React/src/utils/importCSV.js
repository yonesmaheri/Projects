export function importTransactionsFromCSV(file, onLoad) {
  const reader = new FileReader();

  reader.onload = (e) => {
    const text = e.target.result;
    const lines = text.split("\n").slice(1);

    const transactions = lines.filter(Boolean).map((line) => {
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
