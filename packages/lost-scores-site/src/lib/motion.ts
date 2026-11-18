import { createContext, useContext } from "react";

export interface Motion {
  enabled: boolean;
  toggle: () => void;
}

export const MotionContext = createContext<Motion>({ enabled: true, toggle: () => undefined });

export function useMotion(): Motion {
  return useContext(MotionContext);
}
