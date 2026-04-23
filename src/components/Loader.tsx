/** @format */
import { useEffect, useState, useRef } from "react";
import { useRingConfigurator } from "../store/useRingConfigurator";
import { LoaderPinwheel } from "lucide-react";
import Screenshot from "./Screenshot";
import Share from "./Share";

export default function Loader({ children }: { children: React.ReactNode }) {
  const textureLoading = useRingConfigurator((state) => state.textureLoading);
  const [isVisible, setIsVisible] = useState(textureLoading); // State to control visibility
  const timerRef = useRef<NodeJS.Timeout | null>(null); // Timer ref to clear the interval

  useEffect(() => {
    // If loading state changes to false, add a delay before hiding
    if (!textureLoading) {
      // Start the timer for delay 
      timerRef.current = setTimeout(() => {
        setIsVisible(false); // Hide loader after the delay
      }, 800);
    } else {
      // If texture is loading, immediately show the loader
      setIsVisible(true);
    }

    // Clean up timer if component unmounts or textureLoading changes
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [textureLoading]);

  return (
    <>
      {/* Loader - conditionally shown with fading effect */}
      <div className="relative h-[50vh] md:h-full md:w-[60%] min-h-[400px]">

        <div className="absolute top-0 md:top-auto md:bottom-0 flex gap-4 md:flex-row flex-col ">
          <Screenshot />
          <Share />
        </div>

        <div
          className={`absolute m-6  h-full inset-0 bg-white bg-opacity-50 flex justify-center items-center z-10 transition-opacity ${
            isVisible
              ? "opacity-100 visible duration-0" // Fast appearance
              : "opacity-0 hidden duration-1000" // Slow disappearance with delay
          }`}>
          <LoaderPinwheel className="w-16 h-16 stroke-peach-200  animate-spin" />
        </div>

        {/* Render children */}
        {children}
      </div>
    </>
  );
}