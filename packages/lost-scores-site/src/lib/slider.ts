import { useLayoutEffect, useRef, useState } from "react";

interface Bar {
  left: number;
  width: number;
  ready: boolean;
}

const ACTIVE = '[aria-current="page"], [aria-selected="true"]';

export function useSlider<T extends HTMLElement>(key: unknown) {
  const box = useRef<T>(null);
  const [bar, setBar] = useState<Bar | null>(null);
  useLayoutEffect(() => {
    const element = box.current;
    if (!element) {
      return;
    }
    const measure = () => {
      const active = element.querySelector<HTMLElement>(ACTIVE);
      setBar((current) => (active ? { left: active.offsetLeft, width: active.offsetWidth, ready: current !== null } : null));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    for (const child of element.children) {
      observer.observe(child);
    }
    void document.fonts.ready.then(measure);
    return () => observer.disconnect();
  }, [key]);
  return { box, bar };
}
