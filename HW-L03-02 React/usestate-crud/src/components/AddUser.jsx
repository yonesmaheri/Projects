import { useState } from "react";

function AddUser({ addUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (!name || !email) return;
    addUser({
      id: Date.now(),
      name,
      email,
    });
    setName("");
    setEmail("");
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-slate-800 border-b pb-2">
        Add User
      </h2>

      <form
        onSubmit={submitHandler}
        className="p-5 bg-white rounded-xl shadow-sm border border-slate-200
        transition-all duration-200 hover:shadow-md hover:border-blue-300
        space-y-4 mb-10"
      >
        <div className="flex flex-col gap-1">
          <label className="text-sm text-slate-600">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            className="border border-slate-300 rounded-lg px-3 py-2
            outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-slate-600">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            className="border border-slate-300 rounded-lg px-3 py-2
            outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-blue-100 text-blue-600
          font-medium hover:bg-blue-200 transition"
        >
          Add User
        </button>
      </form>
    </>
  );
}

export default AddUser;
