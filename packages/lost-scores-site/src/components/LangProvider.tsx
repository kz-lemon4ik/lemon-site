import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { languageOf, LangContext, loadDict, type Dict } from "@/lib/i18n";
import { smoothly } from "@/lib/smooth";

export default function LangProvider({ initial, children }: { initial: { id: string; dict: Dict }; children: ReactNode }) {
  const [state, setState] = useState(() => ({ language: languageOf(initial.id), dict: initial.dict }));
  const wanted = useRef(initial.id);
  const [chosen, setChosen] = useState(false);
  useEffect(() => {
    document.documentElement.lang = state.language.id;
    if (!chosen) {
      return;
    }
    try {
      localStorage.setItem("lang", state.language.id);
    } catch {
      return;
    }
  }, [state.language, chosen]);
  const setLang = useCallback((id: string) => {
    setChosen(true);
    wanted.current = id;
    void loadDict(id).then((dict) => {
      if (wanted.current === id) {
        smoothly(() => setState({ language: languageOf(id), dict }));
      }
    });
  }, []);
  const value = useMemo(() => ({ ...state, setLang }), [state, setLang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}
