import { useEffect, useRef } from "react";
import { useMotion } from "@/lib/motion";

type Kind = "hero" | "cover";

const STRENGTH = 7;

export default function Art({ kind, moving = false, className = "" }: { kind: Kind; moving?: boolean; className?: string }) {
  const layer = useRef<HTMLDivElement>(null);
  const { enabled } = useMotion();

  useEffect(() => {
    const element = layer.current;
    if (!element || !moving || !enabled || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }
    const strength = STRENGTH;
    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;
    let frame = 0;
    const step = () => {
      x += (targetX - x) * 0.14;
      y += (targetY - y) * 0.14;
      element.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
      frame = Math.abs(targetX - x) > 0.05 || Math.abs(targetY - y) > 0.05 ? requestAnimationFrame(step) : 0;
    };
    const onMove = (event: PointerEvent) => {
      targetX = (0.5 - event.clientX / window.innerWidth) * 2 * strength;
      targetY = (0.5 - event.clientY / window.innerHeight) * 2 * strength;
      if (!frame) {
        frame = requestAnimationFrame(step);
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
      element.style.transform = "";
    };
  }, [enabled, moving]);

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}>
      <div ref={layer} className={`art art-${kind} absolute -inset-8`} />
    </div>
  );
}
