import { FlaskConical, X } from "lucide-react";
import { useState } from "react";
import { useAb, type Variant } from "@/lib/ab";

const CHOICES: { key: "font" | "layout"; label: string; options: [Variant, string][] }[] = [
  { key: "font", label: "Font", options: [["a", "A · Fredoka"], ["b", "B · Exo 2"]] },
  { key: "layout", label: "Home and header", options: [["a", "A · clean home, header grows"], ["b", "B · first version"]] },
];

export default function AbPanel() {
  const ab = useAb();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    const url = new URL(window.location.href);
    url.searchParams.set("font", ab.font);
    url.searchParams.set("layout", ab.layout);
    try {
      await navigator.clipboard.writeText(url.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm font-medium text-lbl shadow-xl ring-1 ring-acc/40 hover:bg-btn"
      >
        <FlaskConical aria-hidden size={16} className="text-acc" />
        A/B
      </button>
    );
  }

  return (
    <div className="menu-pop fixed bottom-4 left-4 z-50 w-72 rounded-2xl bg-card p-4 text-sm shadow-2xl ring-1 ring-acc/40">
      <div className="mb-3 flex items-center justify-between">
        <span className="font-semibold text-lbl">A/B test</span>
        <button type="button" aria-label="Close" onClick={() => setOpen(false)} className="rounded-lg p-1 text-muted hover:bg-btn hover:text-lbl">
          <X aria-hidden size={16} />
        </button>
      </div>
      {CHOICES.map((choice) => (
        <div key={choice.key} className="mb-3">
          <p className="mb-1.5 text-meta">{choice.label}</p>
          <div className="grid grid-cols-2 gap-1 rounded-xl bg-field p-1">
            {choice.options.map(([value, label]) => (
              <button
                key={value}
                type="button"
                aria-pressed={ab[choice.key] === value}
                onClick={() => ab.choose(choice.key, value)}
                className={`rounded-lg px-2 py-1.5 text-left transition-colors ${ab[choice.key] === value ? "bg-btn text-lbl" : "text-muted hover:text-lbl"}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      ))}
      <button type="button" onClick={copy} className="btn-small w-full py-2">
        {copied ? "Link copied" : "Copy a link with this choice"}
      </button>
    </div>
  );
}
