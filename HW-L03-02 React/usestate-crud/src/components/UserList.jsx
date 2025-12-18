import React from "react";

function UserList({ users, onDelete }) {
  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-slate-800 border-b pb-2">
        Users List
      </h2>

      <ul className="space-y-4">
        {users.map((user) => (
          <li
            key={user.id}
            className="p-5 bg-white rounded-xl shadow-sm border border-slate-200
            transition-all duration-200 hover:shadow-md hover:border-blue-300
            flex items-center justify-between"
          >
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-slate-800 text-lg">
                name: {user.name}
              </span>
              <span className="text-sm text-gray-600">
                email: {user.email}
              </span>
            </div>


            <button
              onClick={() => onDelete(user.id)}
              className="text-white px-4 py-2 rounded-2xl bg-red-500 text-sm hover:bg-red-700 transition"
            >
              Delete user
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default UserList;
