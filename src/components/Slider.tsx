/** @format */
import React from "react";

import { RingConfig } from "../store/useRingConfigurator";
interface ListProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  setter: (value: { [key: string]: number }) => void;
  target: string;
  disabled: boolean;
  config: RingConfig;
}

export default function Slider({
  config,
  setter,
  label = "Name",
  target,
  className = "",
  style,
  disabled,
  ...props
}: ListProps): JSX.Element {
  return (
    <div {...props} className={`relative  w-fit h-fit space-y-4  ${style}`}>
      <h3 className="leading-none font-medium text-black">{label}</h3>
      <div className="flex flex-row gap-4 justify-center items-center flex-wrap ">
        <input
          type="range"
          min="0.5"
          max="2"
          step={0.5}
          value={config.textureScale}
          // defaultValue="1"
          disabled={disabled}
          onChange={(e) => setter({ [target]: Number(e.target.value) })}
          className="w-[250px] md:w-[280px]  h-2  bg-mygray rounded-lg appearance-none cursor-pointer 
                   accent-peach-100 active:accent-peach-200 hover:accent-peach-100"
        />
        <span className="bg-mygray px-4 py-2 rounded-3xl">
          {disabled ? "X" : config.textureScale}
        </span>
      </div>
    </div>
  );
}
