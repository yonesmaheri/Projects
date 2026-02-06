import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactions: JSON.parse(localStorage.getItem("transactions") || "[]"),
  categories: JSON.parse(
    localStorage.getItem("categories") ||
      '["Food","Transport","Rent","Fun","Other"]'
  ),
  timeRange: "day",
  searchQuery: "",
  selectedCategory: "all",
  dateRange: { from: "", to: "" },
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    addTransaction(state, action) {
      state.transactions.unshift(action.payload);
      localStorage.setItem(
        "transactions",
        JSON.stringify(state.transactions)
      );
    },
    removeTransaction(state, action) {
      state.transactions = state.transactions.filter(
        (t) => t.id !== action.payload
      );
      localStorage.setItem(
        "transactions",
        JSON.stringify(state.transactions)
      );
    },
    addCategory(state, action) {
      const name = action.payload.trim();
      if (!name || state.categories.includes(name)) return;
      state.categories.push(name);
      localStorage.setItem("categories", JSON.stringify(state.categories));
    },
    setTimeRange(state, action) {
      state.timeRange = action.payload;
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
    },
    setDateRange(state, action) {
      state.dateRange = action.payload;
    },
    resetFilters(state) {
      state.searchQuery = "";
      state.selectedCategory = "all";
      state.dateRange = { from: "", to: "" };
    },
    importTransactions(state, action) {
      state.transactions.unshift(...action.payload);
      localStorage.setItem(
        "transactions",
        JSON.stringify(state.transactions)
      );
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
