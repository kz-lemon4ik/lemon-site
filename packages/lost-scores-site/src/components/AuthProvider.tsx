import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { api, type Me } from "@/lib/api";
import { AuthContext } from "@/lib/auth";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [me, setMe] = useState<Me | null>(null);
  const [ready, setReady] = useState(false);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    api
      .me(controller.signal)
      .then(
        (found) => setMe(found),
        () => {
          if (!controller.signal.aborted) {
            setMe(null);
          }
        },
      )
      .finally(() => {
        if (!controller.signal.aborted) {
          setReady(true);
        }
      });
    return () => controller.abort();
  }, [version]);

  const logout = useCallback(async () => {
    await api.logout().catch(() => undefined);
    setMe(null);
  }, []);

  const refresh = useCallback(() => setVersion((current) => current + 1), []);

  const value = useMemo(() => ({ me, ready, logout, refresh }), [me, ready, logout, refresh]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
