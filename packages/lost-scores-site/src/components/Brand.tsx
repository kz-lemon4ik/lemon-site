import { NavLink } from "react-router-dom";

export default function Brand({ large = false, label }: { large?: boolean; label?: string }) {
  return (
    <NavLink to="/" end aria-label={label} className="flex h-full shrink-0 items-center gap-2.5 text-xl font-semibold text-lbl">
      <img
        src="/lemon.svg"
        alt=""
        width={36}
        height={36}
        className={`transition-[width,height] duration-300 ${large ? "h-[30px] w-[30px] lg:h-9 lg:w-9" : "h-[30px] w-[30px]"}`}
      />
      Lost Scores
    </NavLink>
  );
}
