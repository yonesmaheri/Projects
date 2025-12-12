import React from "react";

function UserList({ users }) {
  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-slate-800 border-b pb-2">
        Users List
      </h2>

      <ul className="space-y-4">
        {users.map((user, index) => (
          <li
            key={index}
            className="p-5 bg-white rounded-xl shadow-sm border border-slate-200 flex justify-between items-center transition-all duration-200 hover:shadow-md hover:border-blue-300"
          >
            <div className="flex flex-col">
              <span className="font-semibold text-slate-800 text-lg">
                {user.name}
              </span>
              <span className="text-gray-500 text-sm">
                age: {user.age}
              </span>
            </div>

            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-sm font-medium">
              {user.city}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default UserList;