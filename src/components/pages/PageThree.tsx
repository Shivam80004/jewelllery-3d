/** @format */

import { useRingConfigurator } from "../../store/useRingConfigurator";
import { PearlColor } from "../../store/useRingConfigurator";
import List from "../List";
export default function PageThree() {
  const { setConfig,config } = useRingConfigurator();

  // Explicitly type modelOptions to match RingModel
  const pearlOptions: { label: string; value: PearlColor; color:string }[] = [
    { label: "White", value: "white", color:"white" },
    { label: "Pink", value: "pink", color:"pink" },
    { label: "Blue", value: "blue", color:'lightblue' },
  ];

if(config.model === "withPearl")  return (
  <section className="flex  flex-col h-full justify-center items-center space-y-6">

    <List
      label="Pearl Color"
      options={pearlOptions}
      setter={setConfig}
      currentValue={config.pearlColor}
      target="pearlColor"
    />
  </section>
);
}
