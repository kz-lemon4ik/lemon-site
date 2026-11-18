import { Cover, CoverTitle, PageShell, Sheet } from "@/components/Layout";
import { CONTACT } from "@/lib/author";
import { renderRich, useSection, type Parts } from "@/lib/i18n";
import { useTitle } from "@/lib/title";

interface Part {
  title: string;
  text: string[];
}

const PARTS: Parts = {
  mail: () => (
    <a href={`mailto:${CONTACT}`} className="link">
      {CONTACT}
    </a>
  ),
};

export default function Privacy() {
  const t = useSection("privacy");
  useTitle(t("title"));
  return (
    <PageShell>
      <Cover>
        <CoverTitle title={t("title")} subtitle={t("subtitle")} />
      </Cover>
      <Sheet>
        <div className="max-w-3xl space-y-7 pt-4 leading-relaxed text-muted">
          {t.raw<Part[]>("sections").map((part, index) => (
            <section key={part.title}>
              <h2 className="text-lg">
                {index + 1}. {part.title}
              </h2>
              <div className="mt-2 space-y-3">
                {part.text.map((paragraph) => (
                  <p key={paragraph}>{renderRich(paragraph, PARTS)}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </Sheet>
    </PageShell>
  );
}
