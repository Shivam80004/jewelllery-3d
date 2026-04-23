
import { useState } from "react";


interface TextInputProps {
  target: string;
  setter: (value: { [key: string]: string }) => void;
  label?: string;
  maxLength?: number;
  currentValue?:string
}

export default function TextInput({
  target,
  setter,
  label = "Your text",
  maxLength = 30,
  currentValue = "",
}: TextInputProps) {
  const [text, setTextState] = useState(currentValue);

  // Handle text change with validation
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    const value = event.target.value;

    // Ensure value is always a string and enforce maxLength
    if (typeof value === "string" && value.length <= maxLength) {
      setTextState(value);
      setter({ [target]: value });
    }
  };

  return (
    <>
      <form className="w-fit h-fit flex flex-col gap-4 ">
        <label
          htmlFor="text"
          className=" text-md text-start font-medium leading-none">
          {label}
        </label>
        <div className="relative min-w-fit w-[250px] md:w-[280px]">
          <textarea
            id="text"
            name="story"
            rows={5}
            cols={10}
            autoCorrect="on"
            placeholder="Forever"
            maxLength={maxLength}
            value={text}
            onChange={handleChange}
            className="px-4 py-2 rounded-lg min-h-[70px] h-[70px] max-h-[100px] bg-mygray w-full"></textarea>

          {/* Character Counter positioned in the bottom-right corner */}
          <p
            className={`absolute bottom-3 right-2 text-xs  rounded-full border px-2 py-1 leading-none ${
              (text.length / maxLength) * 100 > 80
                ? "text-orange-500"
                : "text-gray-500"
            }`}>
            {`${text.length} / ${maxLength}`} characters
          </p>
        </div>
      </form>
    </>
  );
}