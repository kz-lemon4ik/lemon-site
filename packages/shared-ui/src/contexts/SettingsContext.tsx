import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

export type Theme = "light" | "dark";

interface SettingsContextType {
  isMotionDisabled: boolean;
  setIsMotionDisabled: Dispatch<SetStateAction<boolean>>;
  theme: Theme;
  toggleTheme: () => void;
  applyThemeToDocument: (themeToApply: Theme) => void;
  isHeaderHidden: boolean;
  setIsHeaderHidden: Dispatch<SetStateAction<boolean>>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const systemPrefersReducedMotion = usePrefersReducedMotion();
  const [isMotionDisabled, setIsMotionDisabled] = useLocalStorage<boolean>(
    "userMotionPreference",
    systemPrefersReducedMotion
  );
  const [isHeaderHidden, setIsHeaderHidden] = useState<boolean>(false);

  const [theme, setTheme] = useLocalStorage<Theme>("theme", "dark");

  const applyThemeToDocument = (themeToApply: Theme) => {
    const root = window.document.documentElement;
    root.style.transition = "background-color 0.3s ease";

    if (themeToApply === "light") {
      root.classList.remove("dark");
      root.classList.add("theme-is-light");
    } else {
      root.classList.remove("theme-is-light");
      root.classList.add("dark");
    }
  };

  useEffect(() => {
    const item = window.localStorage.getItem("userMotionPreference");
    if (item === null) {
      setIsMotionDisabled(systemPrefersReducedMotion);
    }
  }, [systemPrefersReducedMotion, setIsMotionDisabled]);

  useEffect(() => {
    applyThemeToDocument(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <SettingsContext.Provider
      value={{
        isMotionDisabled,
        setIsMotionDisabled,
        theme,
        toggleTheme,
        applyThemeToDocument,
        isHeaderHidden,
        setIsHeaderHidden,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
