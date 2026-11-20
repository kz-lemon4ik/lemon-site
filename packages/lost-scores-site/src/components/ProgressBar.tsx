import { useEffect, useState } from "react";
import { useLoading } from "@/lib/progress";

type Phase = "idle" | "waiting" | "busy" | "done";

const DELAY_MS = 200;

export default function ProgressBar() {
  const loading = useLoading();
  const [seen, setSeen] = useState(loading);
  const [phase, setPhase] = useState<Phase>(loading ? "waiting" : "idle");
  const [value, setValue] = useState(0);

  if (seen !== loading) {
    setSeen(loading);
    setPhase(loading ? "waiting" : phase === "busy" ? "done" : "idle");
  }

  useEffect(() => {
    if (phase === "waiting") {
      const timer = setTimeout(() => {
        setValue(0.15);
        setPhase("busy");
      }, DELAY_MS);
      return () => clearTimeout(timer);
    }
    if (phase === "busy") {
      const timer = setInterval(() => setValue((current) => current + (0.9 - current) * 0.12), 250);
      return () => clearInterval(timer);
    }
    if (phase === "done") {
      const timer = setTimeout(() => {
        setPhase("idle");
        setValue(0);
      }, 550);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[3px]">
      <div
        className="progress-bar h-full origin-left"
        style={{
          transform: `scaleX(${phase === "done" ? 1 : value})`,
          opacity: phase === "busy" ? 1 : 0,
          transition: phase === "idle" || phase === "waiting" ? "none" : "transform 250ms ease-out, opacity 300ms ease 250ms",
        }}
      />
    </div>
  );
}
