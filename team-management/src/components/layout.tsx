import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import NavLinks from "./navLinks";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  return (
    <div className="w-full">
      <Navbar>
        <NavLinks />
      </Navbar>
      <div className="p-4">
        <Outlet />
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Layout;
