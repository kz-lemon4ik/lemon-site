import { useEffect, useState } from "react";

function getValueFromLocalStorage<T>(key: string, initialValue: T | (() => T)): T {
  if (typeof window === "undefined") {
    return initialValue instanceof Function ? initialValue() : initialValue;
  }
  try {
    const item = window.localStorage.getItem(key);
    return item
      ? JSON.parse(item)
      : initialValue instanceof Function
        ? initialValue()
        : initialValue;
  } catch (error) {
    console.error(`Error reading localStorage key "${key}":`, error);
    return initialValue instanceof Function ? initialValue() : initialValue;
  }
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T | (() => T)
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState<T>(() =>
    getValueFromLocalStorage(key, initialValue)
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const valueToStore =
          storedValue instanceof Function ? (storedValue as () => T)() : storedValue;
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
