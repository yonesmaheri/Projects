import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTransaction } from "../store/expenseSlice";
import type { RootState, AppDispatch } from "../store/store";
import AddCategory from "./AddCategory";

export default function TransactionForm() {
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector(
    (state: RootState) => state.expense.categories,
  );

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [type, setType] = useState<"expense" | "income">("expense");

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !amount) return;

    const finalAmount =
      type === "expense"
        ? -Math.abs(Number(amount))
        : Math.abs(Number(amount));

    dispatch(
      addTransaction({
        id: crypto.randomUUID(),
        title,
        amount: finalAmount,
        category,
        date: new Date().toString(),
        type,
      }),
    );

    setTitle("");
    setAmount("");
  };

  return (
    <div className="bg-white/80 backdrop-blur p-5 rounded-2xl shadow-sm space-y-4">
      <form onSubmit={submitHandler} className="space-y-4">
        <h2 className="text-base font-semibold text-slate-700">
          New Transaction
        </h2>

        <div className="grid grid-cols-2 gap-2 bg-slate-100 rounded-xl p-1">
          {["expense", "income"].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setType(item as "expense" | "income")}
              className={`py-2 rounded-lg text-sm transition ${
                type === item
                  ? "bg-white shadow-sm text-slate-900"
                  : "text-slate-500"
              }`}
            >
              {item === "expense" ? "Expense" : "Income"}
            </button>
          ))}
        </div>

        <div className="space-y-1">
          <label className="text-xs text-slate-500">Title</label>
          <input
            className="w-full bg-slate-50 rounded-lg px-3 py-2 text-sm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs text-slate-500">Amount</label>
          <input
            type="number"
            className="w-full bg-slate-50 rounded-lg px-3 py-2 text-sm"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs text-slate-500">Category</label>
          <select
            className="w-full bg-slate-50 rounded-lg px-3 py-2 text-sm"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2 rounded-xl bg-slate-900/90 text-white text-sm"
        >
          Add Transaction
        </button>
      </form>

      <AddCategory />
    </div>
  );
}


