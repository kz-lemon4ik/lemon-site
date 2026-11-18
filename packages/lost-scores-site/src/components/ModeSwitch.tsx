import type { ReactNode } from "react";

interface Option<T extends string> {
  id: T;
  label: string;
  icon?: ReactNode;
}

interface Props<T extends string> {
  value: T;
  options: [Option<T>, Option<T>];
  onChange: (value: T) => void;
  label: string;
  className?: string;
}

export default function ModeSwitch<T extends string>({ value, options, onChange, label, className = "" }: Props<T>) {
  const second = value === options[1].id;
  return (
    <button
      type="button"
      role="switch"
      aria-checked={second}
      aria-label={label}
      title={label}
      onClick={() => onChange(second ? options[0].id : options[1].id)}
      className={`group relative grid h-9 shrink-0 grid-cols-2 rounded-[10px] bg-btn p-[3px] text-sm ${className}`}
    >
      <span
        aria-hidden
        className={`absolute inset-y-[3px] left-[3px] w-[calc(50%-3px)] rounded-lg border-2 border-acc bg-tog-on transition-transform duration-[180ms] ease-out ${second ? "translate-x-full" : ""}`}
      />
      {options.map((option) => (
        <span
          key={option.id}
          className={`relative flex items-center justify-center gap-1.5 whitespace-nowrap px-3 font-medium transition-colors ${
            option.id === value ? "text-lbl" : "text-muted group-hover:text-lbl"
          }`}
        >
          {option.icon}
          {option.label}
        </span>
      ))}
    </button>
  );
}
