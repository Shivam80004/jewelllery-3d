

interface ListOption<T> {
  label: string;
  value: T;
  color:string;
  
}

interface ListProps<T> {
  label?: string;
  options: ListOption<T>[];
  setter: (value: { [key: string]: T }) => void;
  currentValue?: T;
  target:string;
}


export default function List<T>({label,options,setter,currentValue,target}:ListProps<T>){





return (
  <>
    <div className="w-full  space-y-4">
      {label && <h3 className="leading-none font-medium text-black">{label}</h3>}

      <div className=" flex flex-wrap gap-2">
        {options.map(({ label, value, color }) => (
          <button
            key={label}
            onClick={() => setter({[target]:value})}
            className={`flex items-center gap-1 px-4 py-2 w-fit rounded-full transition-all duration-200 hover:bg-peach-100 ${
              currentValue === value
                ? "bg-peach-200"
                : "bg-mygray"
            }`}
            >
            <div
              className="w-7 h-7 rounded-full border-2 border-white"
              style={{ backgroundColor: color }}></div>
            <span className=" ">{label}</span>
          </button>
        ))}
      </div>
    </div>
  </>
);




}