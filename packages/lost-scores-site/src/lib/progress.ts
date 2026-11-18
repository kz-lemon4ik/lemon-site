import { useSyncExternalStore } from "react";

let active = 0;
const listeners = new Set<() => void>();

function emit(): void {
  for (const listener of listeners) {
    listener();
  }
}

export function startProgress(): () => void {
  active += 1;
  emit();
  let open = true;
  return () => {
    if (open) {
      open = false;
      active -= 1;
      emit();
    }
  };
}

export async function track<T>(work: Promise<T>): Promise<T> {
  const stop = startProgress();
  try {
    return await work;
  } finally {
    stop();
  }
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useLoading(): boolean {
  return useSyncExternalStore(subscribe, () => active > 0);
}
