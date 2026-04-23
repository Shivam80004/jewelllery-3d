/** @format */

import { useState } from "react";
import PageOne from "./pages/PageOne";
import PageTwo from "./pages/PageTwo";
import PageThree from "./pages/PageThree";
import PageFour from "./pages/PageFour";
 import { useRingConfigurator } from "../store/useRingConfigurator";

// Page mapping (store JSX elements)
const pages: Record<number, JSX.Element> = {
  1: <PageOne />,
  2: <PageTwo/>,
  3: <PageThree/>,
  4:<PageFour/>
};


export default function PaginationUI() {
  const [currentPage, setCurrentPage] = useState(1);
const withPearl = useRingConfigurator((state)=>state.config.model === "withPearl")



  const handleNext = () => {
    setCurrentPage((prev) => {
      if (prev === 2 && !withPearl) return 4; // Skip Page 3 if no pearl
      return Math.min(Object.keys(pages).length, prev + 1);
    });
  };

  const handlePrev = () => {
    setCurrentPage((prev) => {
      if (prev === 4 && !withPearl) return 2; // Skip Page 3 if no pearl
      return Math.max(1, prev - 1);
    });
  };


  return (
    <div className="flex p-6 min-h-[500px] space-y-4 h-fit md:max-w-[450px] drop-shadow-2xl shadow-gray-300 shadow-md w-full flex-col justify-between items-center text-black font-medium bg-white rounded-2xl">
      {/* Page Number Buttons */}
      <div className="flex gap-4  ">
        {Object.keys(pages).map((page) => {
          const pageNum = Number(page); // Convert key to number
          return (
            <button
              key={pageNum}
              disabled={(pageNum ===3 && !withPearl)}
              onClick={() => setCurrentPage(pageNum)}
              className={`px-4 py-2  transition-all duration-200 ${ (pageNum ===3 && !withPearl)? "text-black/20":"text-black"} rounded-full bg-mygray ${
                currentPage === pageNum ? "bg-peach-200" : ""
              }`}>
              {pageNum}
            </button>
          );
        })}
      </div>
      <div className="w-full min-h-[60%] font-normal">
        {pages[currentPage] ?? <div>Page Not Found</div>}
      </div>
      {/* Pagination Controls */}
      <div className="flex w-full  justify-between gap-2  ">
        <button
          className="px-4 py-2 hover:bg-peach-100 active:bg-peach-100 transition-all duration-200 bg-mygray rounded-full disabled:opacity-0"
          onClick={handlePrev}
          disabled={currentPage === 1}>
          Prev
        </button>

        {/* <span>Page {currentPage}</span> */}

        <button
          className="px-4 py-2 hover:bg-peach-100 active:bg-peach-100 transition-all duration-200 bg-peach-200 rounded-full disabled:opacity-0"
          onClick={handleNext
          }
          disabled={currentPage === Object.keys(pages).length}>
          Next
        </button>
      </div>
    </div>
  );
}
