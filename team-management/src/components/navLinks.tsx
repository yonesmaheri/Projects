import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Links = [
  { id: 0, title: "Home", href: "/" },
  { id: 1, title: "Users", href: "/users" },
  { id: 2, title: "Projects", href: "/projects" },
  // { id: 3, title: "Tasks", href: "/tasks" },
];

function NavLinks() {
  const pathname = useLocation();
  const { user, logout } = useAuth();
  return (
    <div className="flex items-center justify-between">
      <p>{user?.name}</p>
      <div className="flex item-center gap-5 justify-center">
        {Links.map((item) => (
          <Link
            to={item.href}
            className={`font-light hover:bg-elevated px-3.5 py-2 transition-all rounded-xl ${
              pathname.pathname === item.href ? "bg-elevated" : ""
            }`}
          >
            {item.title}
          </Link>
        ))}
      </div>
      <button
        className=" border border-subtle py-2 px-6 rounded-xl bg-transparent hover:bg-elevated transition-all"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}

export default NavLinks;
