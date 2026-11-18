import Slider from "@/components/Slider";
import { useSlider } from "@/lib/slider";

interface Tab<T extends string> {
  id: T;
  label: string;
}

interface Props<T extends string> {
  tabs: Tab<T>[];
  active: T;
  onChange: (id: T) => void;
  label: string;
}

export default function Tabs<T extends string>({ tabs, active, onChange, label }: Props<T>) {
  const { box, bar } = useSlider<HTMLDivElement>(`${active}|${tabs.map((tab) => tab.label).join("|")}`);
  return (
    <div ref={box} role="tablist" aria-label={label} className="relative flex gap-6 overflow-x-auto border-b border-divider">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={tab.id === active}
          onClick={() => onChange(tab.id)}
          className={`whitespace-nowrap py-3 font-medium transition-colors ${tab.id === active ? "text-lbl" : "text-muted hover:text-lbl"}`}
        >
          {tab.label}
        </button>
      ))}
      <Slider bar={bar} />
    </div>
  );
}
