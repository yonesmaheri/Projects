import { createSelector } from "@reduxjs/toolkit";

const selectExpense = (state) => state.expense;

export const selectIncomeExpenseBalance = createSelector(
  selectExpense,
  ({ transactions }) => {
    let income = 0;
    let expense = 0;

    transactions.forEach((t) => {
      if (t.amount > 0) income += t.amount;
      else expense += Math.abs(t.amount);
    });

    return {
      income,
      expense,
      balance: income - expense,
    };
  }
);

export const selectCategoryTotals = createSelector(
  selectExpense,
  ({ transactions }) => {
    const totals = {};
    transactions.forEach((t) => {
      totals[t.category] = (totals[t.category] || 0) + Math.abs(t.amount);
    });
    return totals;
  }
);

export const selectFilteredTransactions = createSelector(
  selectExpense,
  ({ transactions, searchQuery, selectedCategory, dateRange }) =>
    transactions.filter((t) => {
      const matchesSearch =
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.amount.toString().includes(searchQuery);

      const matchesCategory =
        selectedCategory === "all" || t.category === selectedCategory;

      const d = t.date.slice(0, 10);
      const matchesDate =
        (!dateRange.from || d >= dateRange.from) &&
        (!dateRange.to || d <= dateRange.to);

      return matchesSearch && matchesCategory && matchesDate;
    })
);

const getTimeKey = (date, range) => {
  const d = new Date(date);

  if (range === "minute") return d.toString().slice(0, 16);
  if (range === "hour") return d.toString().slice(0, 13);
  return d.toString().slice(0, 10);
};

export const selectTimeSeries = createSelector(
  selectExpense,
  ({ transactions, timeRange }) => {
    const map = {};

    transactions.forEach((t) => {
      const key = getTimeKey(t.date, timeRange);

      if (!map[key]) {
        map[key] = { time: key, income: 0, expense: 0 };
      }

      if (t.amount > 0) {
        map[key].income += t.amount;
      } else {
        map[key].expense += Math.abs(t.amount);
      }
    });

    return Object.values(map).sort(
      (a, b) =>
        new Date(a.time).getTime() - new Date(b.time).getTime()
    );
  }
);