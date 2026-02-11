import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Transaction = {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  type: "income" | "expense";
};

export type DateRange = {
  from: string;
  to: string;
};

export type TimeRange = "minute" | "hour" | "day";

export type ExpenseState = {
  transactions: Transaction[];
  categories: string[];
  timeRange: TimeRange;
  searchQuery: string;
  selectedCategory: string;
  dateRange: DateRange;
};

const loadTransactions = (): Transaction[] => {
  try {
    const raw = localStorage.getItem("transactions");
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Transaction[];
    if (!Array.isArray(parsed)) return [];
    return parsed.map((t) => ({
      ...t,
      type:
        t.type ||
        (t.amount >= 0
          ? ("income" as const)
          : ("expense" as const)),
    }));
  } catch {
    return [];
  }
};

const loadCategories = (): string[] => {
  try {
    const raw =
      localStorage.getItem("categories") ||
      '["Food","Transport","Rent","Fun","Other"]';
    const parsed = JSON.parse(raw) as string[];
    if (!Array.isArray(parsed)) {
      return ["Food", "Transport", "Rent", "Fun", "Other"];
    }
    return parsed;
  } catch {
    return ["Food", "Transport", "Rent", "Fun", "Other"];
  }
};

const initialState: ExpenseState = {
  transactions: loadTransactions(),
  categories: loadCategories(),
  timeRange: "day",
  searchQuery: "",
  selectedCategory: "all",
  dateRange: { from: "", to: "" },
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    addTransaction(state, action: PayloadAction<Transaction>) {
      state.transactions.unshift(action.payload);
      localStorage.setItem("transactions", JSON.stringify(state.transactions));
    },
    removeTransaction(state, action: PayloadAction<Transaction["id"]>) {
      state.transactions = state.transactions.filter(
        (t) => t.id !== action.payload,
      );
      localStorage.setItem("transactions", JSON.stringify(state.transactions));
    },
    addCategory(state, action: PayloadAction<string>) {
      const name = action.payload.trim();
      if (!name || state.categories.includes(name)) return;
      state.categories.push(name);
      localStorage.setItem("categories", JSON.stringify(state.categories));
    },
    setTimeRange(state, action: PayloadAction<TimeRange>) {
      state.timeRange = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setSelectedCategory(state, action: PayloadAction<string>) {
      state.selectedCategory = action.payload;
    },
    setDateRange(state, action: PayloadAction<DateRange>) {
      state.dateRange = action.payload;
    },
    resetFilters(state) {
      state.searchQuery = "";
      state.selectedCategory = "all";
      state.dateRange = { from: "", to: "" };
    },
    importTransactions(state, action: PayloadAction<Transaction[]>) {
      state.transactions.unshift(...action.payload);
      localStorage.setItem("transactions", JSON.stringify(state.transactions));
    },
  },
});

export const {
  addTransaction,
  removeTransaction,
  addCategory,
  setTimeRange,
  setSearchQuery,
  setSelectedCategory,
  setDateRange,
  resetFilters,
  importTransactions,
} = expenseSlice.actions;

export default expenseSlice.reducer;


