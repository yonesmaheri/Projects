import { useDispatch, useSelector } from "react-redux";
import { removeTransaction } from "../store/expenseSlice";
import { selectFilteredTransactions } from "../store/selectors";

export default function TransactionList() {
  const dispatch = useDispatch();
  const filteredTransactions = useSelector(selectFilteredTransactions);

  if (!filteredTransactions.length) {
    return (
      <p className="text-gray-500 text-center">
        No transactions yet
      </p>
    );
  }

  return (
    <ul className="space-y-2 max-h-[420px] overflow-y-auto">
      {filteredTransactions.map((transaction) => (
        <li
          key={transaction.id}
          className="bg-white p-3 rounded-xl flex justify-between gap-3"
        >
          <div>
            <p className="font-medium">{transaction.title}</p>
            <p className="text-sm text-gray-500">
              {transaction.category} —{" "}
              {new Date(transaction.date).toLocaleDateString()}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span
              className={`font-bold ${
                transaction.amount < 0
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              {transaction.amount}
            </span>

            <button
              onClick={() =>
                dispatch(removeTransaction(transaction.id))
              }
              className="text-red-500"
            >
              ✕
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
