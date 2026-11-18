import type { ReactNode } from "react";
import { useT } from "@/lib/i18n";

export function Spinner() {
  const label = useT().t("loading");
  return (
    <div role="status" aria-label={label} className="grid place-items-center py-20">
      <span className="h-8 w-8 animate-spin rounded-full border-[3px] border-btn border-t-acc" />
    </div>
  );
}

export function Rows({ count = 6 }: { count?: number }) {
  const label = useT().t("loading");
  return (
    <div role="status" aria-label={label} className="space-y-2 pt-3">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="h-14 animate-pulse rounded-xl bg-row" />
      ))}
    </div>
  );
}

interface MessageProps {
  title: string;
  children?: ReactNode;
  action?: ReactNode;
}

export function Message({ title, children, action }: MessageProps) {
  return (
    <div className="mx-auto max-w-md py-14 text-center">
      <h2 className="text-xl">{title}</h2>
      {children && <div className="mt-2 text-muted">{children}</div>}
      {action && <div className="mt-6 flex flex-wrap justify-center gap-3">{action}</div>}
    </div>
  );
}
