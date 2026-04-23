
import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

interface Option<T> {
  label: string;
  value: T;
}

interface DropdownProps<T> {
  label?: string;
  options: Option<T>[];
  setter: (value: { [key: string]: T }) => void;
  currentValue?: T;
  placeholder?: string;
  target: string;
}


export default function Dropdown<T>({
  label='material',
  options,
  setter,
  currentValue,
  placeholder = "Select an option",
  target
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative space-y-4" ref={dropdownRef}>
       <h3 className=" text-md text-start font-medium leading-none">{label}:</h3>
          <div className="relative">
          {/* Dropdown Button */}
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="px-4 py-2 bg-peach-200  w-[250px] md:w-[280px] group justify-between rounded-full  transition-all flex gap-2 items-center">
            {/* Label */}
          

            {/* Selected Value */}
            <span className=" font-semibold">
              {options.find((opt) => opt.value === currentValue)?.label ||
                placeholder}
            </span>

            <div className=" rounded-full p-0.5 group-hover:bg-peach-100"> 
            <ChevronDown size={20} className="" />
            </div>   
          </button>

          {/* Dropdown Options */}
          {isOpen && (
            <div className="absolute  -mt-10 w-full max-h-[200px] overflow-y-auto rounded-2xl bg-white shadow-md p-2 space-y-2 z-10">
              {options.map(({ label, value }) => (
                <p
                  key={String(value)}
                  onClick={() => {
                    setter({[target]:value});
                    setIsOpen(false); // Close dropdown after selection
                  }}
                  className={`cursor-pointer px-4 py-2 hover:bg-peach-100 transition-all rounded-full ${
                    currentValue === value ? "bg-peach-200 " : "bg-mygray"
                  }`}>
                  {label}
                </p>
              ))}
            </div>
          )}
        </div>
    </div>
  );
}