import { createContext, useContext, useEffect, useState } from "react";

const ExpenseContext = createContext(null);

export const ExpenseProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [timeRange, setTimeRange] = useState("day");
  const [categories, setCategories] = useState([
    "Food",
    "Transport",
    "Rent",
    "Fun",
    "Other",
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });

  useEffect(() => {
    const stored = localStorage.getItem("transactions");
    if (stored) setTransactions(JSON.parse(stored));
    const storedCategories = localStorage.getItem("categories");
    if (storedCategories) setCategories(JSON.parse(storedCategories));
  }, []);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  const addTransaction = (t) => {
    setTransactions((prev) => [t, ...prev]);
  };

  const addCategory = (name) => {
    if (!name.trim()) alert("Enter a name for category");
    if (categories.includes(name)) alert("Category already exists");

    setCategories((prev) => [...prev, name]);
  };

  const removeTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  let income = 0;
  let expense = 0;
  const categoryTotals = {};
  const timeSeriesMap = {};

  const getTimeKey = (date, range) => {
    const d = new Date(date);

    if (range === "minute") return d.toString().slice(0, 16);
    if (range === "hour") return d.toString().slice(0, 13);
    return d.toString().slice(0, 10);
  };

  for (const t of transactions) {
    if (t.amount > 0) {
      income += t.amount;
    } else {
      expense += Math.abs(t.amount);
    }

    if (!categoryTotals[t.category]) {
      categoryTotals[t.category] = 0;
    }
    categoryTotals[t.category] += Math.abs(t.amount);

    const key = getTimeKey(t.date, timeRange);
    if (!timeSeriesMap[key]) {
      timeSeriesMap[key] = { time: key, income: 0, expense: 0 };
    }
    if (t.amount > 0) {
      timeSeriesMap[key].income += t.amount;
    } else {
      timeSeriesMap[key].expense += Math.abs(t.amount);
    }
  }

  const balance = income - expense;

  const timeSeries = Object.values(timeSeriesMap).sort(
    (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
  );

  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.amount.toString().includes(searchQuery);

    const matchesCategory =
      selectedCategory === "all" || t.category === selectedCategory;

    const transactionDate = t.date.slice(0, 10);

    const matchesDate =
      (!dateRange.from || transactionDate >= dateRange.from) &&
      (!dateRange.to || transactionDate <= dateRange.to);

    return matchesSearch && matchesCategory && matchesDate;
  });

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setDateRange({ from: "", to: "" });
  };

  const importTransactions = (newTransactions) => {
    setTransactions((prev) => [...newTransactions, ...prev]);
  };

  return (
    <ExpenseContext.Provider
      value={{
        transactions,
        addTransaction,
        removeTransaction,
        income,
        expense,
        balance,
        categoryTotals,
        timeSeries,
        timeRange,
        setTimeRange,
        categories,
        addCategory,
        filteredTransactions,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        dateRange,
        setDateRange,
        resetFilters,
        importTransactions,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpense = () => useContext(ExpenseContext);
