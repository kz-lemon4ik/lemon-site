import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Cover, CoverTitle, PageShell, Sheet } from "@/components/Layout";
import { CONTACT } from "@/lib/author";
import { renderRich, useSection, type Parts } from "@/lib/i18n";
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

export default function Faq() {
  const t = useSection("faq");
  useTitle(t("title"));
  const [open, setOpen] = useState<number | null>(null);
  const { hash } = useLocation();
  const questions = t.raw<Item[]>("items");
  useEffect(() => {
    const index = questions.findIndex((item) => item.id === hash.slice(1));
    if (index >= 0) {
      setOpen(index);
      document.getElementById(questions[index].id)?.scrollIntoView({ block: "start" });
    }
  }, [hash, questions]);
  return (
    <PageShell>
      <Cover>
        <CoverTitle title={t("title")} subtitle={t("subtitle")} />
      </Cover>
      <Sheet>
        <div className="space-y-2 pt-4">
          {questions.map((item, index) => {
            const isOpen = open === index;
            const panel = `faq-${index}`;
            return (
              <div key={item.id} id={item.id} className={`scroll-mt-24 rounded-xl transition-colors duration-200 ${isOpen ? "bg-row-hi" : "bg-row"}`}>
                <h2 className="text-lg">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panel}
                    onClick={() => setOpen(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-medium text-lbl"
                  >
                    {item.question}
                    <span aria-hidden className={`text-2xl leading-none text-muted transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}>
                      +
                    </span>
                  </button>
                </h2>
                <div
                  id={panel}
                  role="region"
                  inert={!isOpen}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
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
          })}
        </div>
      </Sheet>
    </PageShell>
  );
}
