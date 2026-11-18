import { Moon, Sun } from "lucide-react";
import type { ReactNode } from "react";
import ModeSwitch from "@/components/ModeSwitch";
import Switch from "@/components/Switch";
import { useSection } from "@/lib/i18n";
import { useMotion } from "@/lib/motion";
import { useTheme } from "@/lib/theme";

function Row({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5">
      <span>
        <span className="block text-lbl">{label}</span>
        {hint && <span className="block text-xs text-meta">{hint}</span>}
      </span>
      {children}
    </div>
  );
}

export default function Settings() {
  const t = useSection("settings");
  const { enabled, toggle } = useMotion();
  const { theme, setTheme } = useTheme();
  return (
    <div className="divide-y divide-divider">
      <Row label={t("theme")}>
        <ModeSwitch
          value={theme}
          label={t("lightTheme")}
          onChange={setTheme}
          options={[
            { id: "dark", label: t("dark"), icon: <Moon aria-hidden size={14} /> },
            { id: "light", label: t("light"), icon: <Sun aria-hidden size={14} /> },
          ]}
        />
      </Row>
      <Row label={t("animations")} hint={t("animationsHint")}>
        <Switch checked={enabled} onChange={toggle} label={t("animations")} />
      </Row>
    </div>
  );
}
