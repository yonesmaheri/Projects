import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { addCategory } from "../store/expenseSlice";
import type { AppDispatch } from "../store/store";

export default function AddCategory() {
  const dispatch = useDispatch<AppDispatch>();
  const [value, setValue] = useState("");

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value.trim()) return;

    dispatch(addCategory(value));
    setValue("");
  };

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="New category"
        className="flex-1 bg-slate-50 rounded-lg px-3 py-2 text-sm"
      />

      <button
        type="submit"
        className="px-3 py-2 rounded-lg bg-slate-200 text-slate-700 text-sm"
      >
        Add
      </button>
    </form>
  );
}
