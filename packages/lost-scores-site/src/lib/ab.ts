import { createContext, useContext } from "react";

export type Variant = "a" | "b";

export interface Ab {
  font: Variant;
  layout: Variant;
  choose: (key: "font" | "layout", value: Variant) => void;
}

export const AbContext = createContext<Ab>({ font: "a", layout: "a", choose: () => undefined });

export function useAb(): Ab {
  return useContext(AbContext);
}
