import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Cover, CoverTitle, PageShell, Sheet } from "@/components/Layout";
import { CONTACT } from "@/lib/author";
import { renderRich, useSection, type Parts, type SectionKey } from "@/lib/i18n";
import { REPOSITORY } from "@/lib/release";
import { useTitle } from "@/lib/title";

interface Item {
  id: string;
  question: string;
  answer: string[];
}

const PARTS: Parts = {
  hall: (text) => (
    <Link to="/rankings" className="link">
      {text}
    </Link>
  ),
  download: (text) => (
    <Link to="/download" className="link">
      {text}
    </Link>
  ),
  privacy: (text) => (
    <Link to="/privacy" className="link">
      {text}
    </Link>
  ),
  issues: (text) => (
    <a href={`${REPOSITORY}/issues`} className="link">
      {text}
    </a>
  ),
  mail: () => (
    <a href={`mailto:${CONTACT}`} className="link">
      {CONTACT}
    </a>
  ),
};

const GROUPS: [string, string[]][] = [
  ["about", ["lost", "lazer"]],
  ["safety", ["safe", "login", "who", "delete"]],
  ["hall", ["verified", "hall", "replay"]],
  ["help", ["warning", "bug"]],
];

function Question({ item, open, toggle }: { item: Item; open: boolean; toggle: () => void }) {
  const panel = `faq-${item.id}-answer`;
  return (
    <div id={item.id} className={`scroll-mt-24 rounded-xl transition-colors duration-200 ${open ? "bg-row-hi" : "bg-row"}`}>
      <h3 className="text-lg">
        <button type="button" aria-expanded={open} aria-controls={panel} onClick={toggle} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-medium text-lbl">
          {item.question}
          <span aria-hidden className={`text-2xl leading-none text-muted transition-transform duration-200 ${open ? "rotate-45" : ""}`}>
            +
          </span>
        </button>
      </h3>
      <div id={panel} role="region" inert={!open} className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          <div className="space-y-3 px-5 pb-5 text-muted">
            {item.answer.map((paragraph) => (
              <p key={paragraph}>{renderRich(paragraph, PARTS)}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Faq() {
  const t = useSection("faq");
  useTitle(t("title"));
  const [open, setOpen] = useState<string | null>(null);
  const { hash } = useLocation();
  const questions = t.raw<Item[]>("items");
  const byId = new Map(questions.map((item) => [item.id, item]));
  useEffect(() => {
    const id = hash.slice(1);
    if (questions.some((item) => item.id === id)) {
      setOpen(id);
      document.getElementById(id)?.scrollIntoView({ block: "start" });
    }
  }, [hash, questions]);
  const toggle = (id: string) => {
    const next = open === id ? null : id;
    setOpen(next);
    window.history.replaceState(window.history.state, "", next ? `#${next}` : window.location.pathname + window.location.search);
  };
  return (
    <PageShell>
      <Cover>
        <CoverTitle title={t("title")} subtitle={t("subtitle")} />
      </Cover>
      <Sheet>
        <div className="pt-4 lg:grid lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-8">
          <nav aria-label={t("topics")} className="mb-6 flex flex-wrap gap-2 lg:sticky lg:top-28 lg:mb-0 lg:block lg:space-y-1 lg:self-start">
            {GROUPS.map(([group]) => (
              <a
                key={group}
                href={`#group-${group}`}
                className="shrink-0 rounded-full bg-btn px-4 py-2 text-sm font-medium text-muted transition-colors hover:text-lbl lg:block lg:rounded-lg lg:bg-transparent lg:px-3 lg:py-2 lg:hover:bg-btn"
              >
                {t(`groups.${group}` as SectionKey<"faq">)}
              </a>
            ))}
          </nav>
          <div className="space-y-8">
            {GROUPS.map(([group, ids]) => (
              <section key={group} id={`group-${group}`} className="scroll-mt-24">
                <h2 className="mb-3 text-xl">{t(`groups.${group}` as SectionKey<"faq">)}</h2>
                <div className="space-y-2">
                  {ids.flatMap((id) => {
                    const item = byId.get(id);
                    return item ? [<Question key={id} item={item} open={open === id} toggle={() => toggle(id)} />] : [];
                  })}
                </div>
              </section>
            ))}
          </div>
        </div>
      </Sheet>
    </PageShell>
  );
}
