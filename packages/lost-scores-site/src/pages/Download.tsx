import { Download as DownloadIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Cover, CoverTitle, PageShell, Section, Sheet } from "@/components/Layout";
import { useFormat } from "@/lib/format";
import { useSection, type Words } from "@/lib/i18n";
import { detectPlatform, PLATFORM_NAMES, type Platform } from "@/lib/platform";
import { REPOSITORY, useRelease, type Release } from "@/lib/release";
import { useTitle } from "@/lib/title";

const PUBLIC_KEY = "RWTdGCBD/sd6R9S9//74p+bhwfQvkEoXgmSdC0yoxrBOOo/IcTOfMyud";

type Text = Words<"download">;

const ORDER: Platform[] = ["windows", "macos", "linux"];

function Status({ state, t }: { state: ReturnType<typeof useRelease>; t: Text }) {
  const f = useFormat();
  if (state.status === "loading") {
    return <p className="text-muted">{t("looking")}</p>;
  }
  if (state.status === "ready") {
    return (
      <p className="text-muted">
        {t.rich("versionLine", { v: (text) => <span className="font-medium text-lbl">{text}</span> }, { version: state.release.version, day: f.day(state.release.published) })} ·{" "}
        <a href={state.release.page} className="link">
          {t("whatsNew")}
        </a>
        {state.release.mirror && <span className="mt-1 block text-sm">{t("mirror")}</span>}
      </p>
    );
  }
  if (state.status === "none") {
    return <p className="text-muted">{t("soon")}</p>;
  }
  return (
    <p className="text-muted">
      {t.rich("githubDown", {
        link: (text) => (
          <a href={`${REPOSITORY}/releases/latest`} className="link">
            {text}
          </a>
        ),
      })}
    </p>
  );
}

function PlatformCard({ platform, release, mine, t }: { platform: Platform; release: Release | null; mine: boolean; t: Text }) {
  const f = useFormat();
  const file = release?.files[platform];
  return (
    <div id={platform} className={`flex scroll-mt-24 flex-col rounded-2xl p-5 ${mine ? "bg-row-hi ring-1 ring-acc/60" : "bg-row"}`}>
      <div className="flex items-center gap-2">
        <h2 className="text-2xl">{PLATFORM_NAMES[platform]}</h2>
        {mine && <span className="chip bg-acc/15 text-acc">{t("yourSystem")}</span>}
      </div>
      <p className="mt-1 text-sm text-meta">{t(`platforms.${platform}.needs`)}</p>
      <p className="mt-3 flex-1 text-muted">{t(`platforms.${platform}.how`)}</p>
      {file ? (
        <a href={file.url} className={`${mine ? "btn-primary" : "btn-secondary"} mt-5 text-base`}>
          <DownloadIcon aria-hidden size={18} />
          {t("download")} · {f.size(file.size)}
        </a>
      ) : (
        <span className="btn mt-5 cursor-default bg-btn/60 px-5 py-3 text-muted">{t("notYet")}</span>
      )}
    </div>
  );
}

export default function Download() {
  const t = useSection("download");
  useTitle(t("title"));
  const state = useRelease();
  const [platform] = useState(detectPlatform);
  const { hash } = useLocation();
  const release = state.status === "ready" ? state.release : null;
  const ordered = [...ORDER].sort((a, b) => Number(b === platform) - Number(a === platform));

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
    }
  }, [hash]);

  return (
    <PageShell>
      <Cover>
        <CoverTitle title={t("title")} subtitle={t("subtitle")} />
      </Cover>
      <Sheet>
        <div className="space-y-6 pt-4">
          <Status state={state} t={t} />
          <div className="grid gap-4 lg:grid-cols-3">
            {ordered.map((item) => (
              <PlatformCard key={item} platform={item} release={release} mine={item === platform} t={t} />
            ))}
          </div>

          <Section title={t("needTitle")}>
            <ul className="list-disc space-y-1.5 pl-5 text-muted">
              {t.raw<string[]>("need").map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </Section>

          <Section title={t("firstTitle")}>
            <ul className="list-disc space-y-1.5 pl-5 text-muted">
              {t.raw<{ system: string; text: string }[]>("first").map(({ system, text: steps }) => (
                <li key={system}>
                  <span className="text-lbl">{system}</span> {steps}
                </li>
              ))}
            </ul>
          </Section>

          <Section title={t("nextTitle")}>
            <p className="text-muted">{t("next")}</p>
          </Section>

          <Section title={t("updatesTitle")}>
            <p className="text-muted">{t("updates")}</p>
          </Section>

          <Section title={t("checkTitle")}>
            <p className="text-muted">
              {t.rich("check", {
                minisign: (text) => (
                  <a href="https://jedisct1.github.io/minisign/" className="link">
                    {text}
                  </a>
                ),
                sums: () => <code className="text-lbl">SHA256SUMS</code>,
                signature: () => <code className="text-lbl">SHA256SUMS.minisig</code>,
              })}
            </p>
            <pre className="mt-3 overflow-x-auto rounded-xl bg-field p-4 text-sm text-lbl">
              {`minisign -Vm SHA256SUMS -P ${PUBLIC_KEY}\nsha256sum --check --ignore-missing SHA256SUMS`}
            </pre>
            {release?.sums && release.signature && (
              <p className="mt-3 text-sm text-muted">
                <a href={release.sums.url} className="link">
                  SHA256SUMS
                </a>{" "}
                ·{" "}
                <a href={release.signature.url} className="link">
                  SHA256SUMS.minisig
                </a>
              </p>
            )}
          </Section>

          <Section title={t("cliTitle")}>
            <p className="text-muted">
              {t.rich("cli", {
                code: (text) => <code className="text-lbl">{text}</code>,
                release: (text) => (
                  <a href={release?.page ?? `${REPOSITORY}/releases`} className="link">
                    {text}
                  </a>
                ),
                github: (text) => (
                  <a href={REPOSITORY} className="link">
                    {text}
                  </a>
                ),
              })}
            </p>
          </Section>
        </div>
      </Sheet>
    </PageShell>
  );
}
