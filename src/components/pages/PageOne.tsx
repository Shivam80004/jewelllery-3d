import { useRingConfigurator } from "../../store/useRingConfigurator"
import { RingModel } from "../../store/useRingConfigurator";
export default function PageOne(){
  const { setConfig, config } = useRingConfigurator();

  // Explicitly type modelOptions to match RingModel
  const modelOptions: { label: string; value: RingModel }[] = [
    { label: "Bandring", value: "plain" },
    { label: "Pearl Ring", value: "withPearl" },
  ];

  return (
    <section className=" flex flex-col h-full justify-center items-center  gap-4 ">
      {modelOptions.map(({ label, value }, i) => {
        return (
          <button
            key={i}
            onClick={() => setConfig({"model": value})}
            className={`bg-mygray active:bg-peach-200 h-[100px] rounded-full transition-all duration-200 hover:bg-peach-100 w-fit px-4 py-2 ${
              config.model === value
                ? "bg-peach-200 "
                : "bg-mygray hover:bg-peach-100"
            }`}>
            {label}
          </button>
        );
      })}{" "}
    </section>
  );
}