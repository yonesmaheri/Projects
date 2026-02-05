import jsPDF from "jspdf";

export function exportTransactionsToPDF(transactions) {
  const doc = new jsPDF();

  doc.setFontSize(14);
  doc.text("Expense Tracker Report", 10, 10);

  let y = 20;

  transactions.forEach((t) => {
    doc.setFontSize(10);
    doc.text(
      `${t.title} | ${t.amount} | ${t.category} | ${new Date(
        t.date
      ).toLocaleDateString()}`,
      10,
      y
    );
    y += 6;

    if (y > 280) {
      doc.addPage();
      y = 20;
    }
  });

  doc.save("transactions.pdf");
}
