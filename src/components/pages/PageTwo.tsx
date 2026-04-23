
import { useRingConfigurator } from "../../store/useRingConfigurator"
import { Material,TextureType } from "../../store/useRingConfigurator";
import Dropdown from "../DropDown";
import List from "../List";
import Slider from "../Slider";
export default function PageTwo(){

  const {  config, setConfig } = useRingConfigurator();

  // Explicitly type modelOptions to match RingModel
  const textureOptions: { label: string; value: TextureType }[] = [
    { label: "Polished", value: "polished" },
    { label: "Brushed", value: "brushed" },
    { label: "Hammered", value: "hammered" },
  ];

    const colorOptions: { label: string; value: Material; color:string }[] = [
      { label: "Gold", value: "gold", color:'yellow'},
      { label: "White Gold", value: "whiteGold", color:"white" },
      { label: "Rose Gold", value: "roseGold", color:"pink"},
    ];


  return (
    <section className="flex  flex-col h-full justify-center items-start space-y-6">
      {/* Dropdown Button */}

      <Dropdown
        label="Texture"
        options={textureOptions}
        setter={setConfig}
        currentValue={config.textureType}
        target="textureType"
      />

<Slider label="Texture Intensity" setter={setConfig} config={config} target={"textureScale"} disabled={config.textureType === 'polished'}/>
      <List
        label="Select a Color"
        options={colorOptions}
        setter={setConfig}
        currentValue={config.material}
        target="material"
      />
     
    </section>
  );
}