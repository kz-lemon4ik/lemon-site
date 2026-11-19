export default function Slider({ bar, className = "" }: { bar: { left: number; width: number; ready: boolean } | null; className?: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute bottom-0 left-0 h-[3px] rounded-full bg-acc ${bar?.ready ? "transition-[transform,width] duration-[250ms] ease-in-out" : ""} ${bar ? "" : "opacity-0"} ${className}`}
      style={bar ? { transform: `translateX(${bar.left}px)`, width: bar.width } : undefined}
    />
  );
}
