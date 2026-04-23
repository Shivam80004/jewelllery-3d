/** @format */
import Navbar from "../components/Navbar";
import React, { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="h-[100vh] min-h-fit ">
      {/* Navbar (optional, replace with your actual navbar component) */}
      <header className="w-full absolute p-6">
        <Navbar />
      </header>

      {/* Main Content */}
      <main className=" h-full w-full min-h-fit p-6 md:pb-6 pb-[15vh] ">
        {children}
      </main>
      <footer className="w-full text-gray-400 md:absolute relative p-2 bottom-0  z-30 text-center text-xs">
        {" "}
        Developed by Alexandra Vašínová © {new Date().getFullYear()}
      </footer>
      {/* Footer (optional) */}
    </div>
  );
};

export { MainLayout };
