/** @format */

import React, { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="h-[100vh] min-h-fit ">
      {/* Navbar (optional, replace with your actual navbar component) */}
      {/* <header className="w-full absolute p-6">
        <Navbar />
      </header> */}

      {/* Main Content */}
      <main className=" h-full w-full min-h-fit md:pb-6 pb-[15vh] ">
        {children}
      </main>
    </div>
  );
};

export { MainLayout };
