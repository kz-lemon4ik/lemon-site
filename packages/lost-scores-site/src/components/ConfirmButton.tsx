import { useEffect, useState } from "react";

export default function ConfirmButton({ label, confirmText, hint, run }: { label: string; confirmText: string; hint?: string; run: () => Promise<void> }) {
  const [armed, setArmed] = useState(false);
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    if (!armed) {
      return;
    }
    const timer = setTimeout(() => setArmed(false), 3000);
    return () => clearTimeout(timer);
  }, [armed]);
  return (
    <button
      type="button"
      title={hint}
      disabled={busy}
      onClick={async () => {
        if (!armed) {
          setArmed(true);
          return;
        }
        setArmed(false);
        setBusy(true);
        await run();
        setBusy(false);
      }}
      className={`btn-small px-3 py-1.5 ${armed ? "bg-down/20 text-down hover:bg-down/30" : ""}`}
    >
      {armed ? confirmText : label}
    </button>
  );
}
