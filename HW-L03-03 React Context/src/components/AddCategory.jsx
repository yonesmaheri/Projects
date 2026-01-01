import { useState } from "react";
import { useExpense } from "../context/ExpenseContext";

export default function AddCategory() {
  const { addCategory } = useExpense();
  const [value, setValue] = useState("");

  const submit = (e) => {
    e.preventDefault();
    addCategory(value);
    setValue("");
  };

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="New category"
        className="flex-1 bg-slate-50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:bg-white focus:ring-1 focus:ring-slate-200"
      />

      <button
        type="submit"
        className="px-3 py-2 rounded-lg bg-slate-200 text-slate-700 hover:bg-slate-300 transition text-sm"
      >
        Add
      </button>
    </form>
  );
}
