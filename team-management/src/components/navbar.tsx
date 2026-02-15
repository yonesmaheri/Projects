import React, { type ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

function Navbar({ children }: Props) {
  return (
    <header className="sticky top-0 z-10 w-full px-4 py-4 lg:py-2.5 border-b border-subtle bg-sidebar">
      {children}
    </header>
  );
}

export default Navbar;
