
import Dropdown from "../DropDown"
import { useRingConfigurator } from "../../store/useRingConfigurator";
import { FontFamily } from "../../store/useRingConfigurator";
import TextInput from "../TextInput";
export default function PageFour(){

    const { config, setTextConfig } = useRingConfigurator();

  // Explicitly type modelOptions to match RingModel
  const fontOptions: { label: string; value: FontFamily }[] = [
    { label: "Cursive", value: "cursive" },
    { label: "Serif", value: "serif" },
    { label: "Sans-serif", value: "sans-serif" },
    { label: "Fantasy", value: "fantasy" },
  ];

  return (
    <>
    <section className="flex  flex-col h-full justify-center items-start space-y-6">
      <Dropdown<FontFamily>
        label="Font Option"
        options={fontOptions}
        setter={setTextConfig}
        currentValue={config.textConfig.fontFamily}
        target="fontFamily"
      />
      <TextInput target={"text"} label={"Your text:"} maxLength={30} setter={setTextConfig} currentValue={config.textConfig.text}/>
      </section>
    </>
  );
}