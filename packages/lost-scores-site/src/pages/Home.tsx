import { ChevronDown, Download } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Art from "@/components/Art";
import ShareBadge from "@/components/ShareBadge";
import Zoom from "@/components/Zoom";
import { api, type ScanPage } from "@/lib/api";
import { useAb } from "@/lib/ab";
import { AUTHOR } from "@/lib/author";
import { useFormat } from "@/lib/format";
import { useSection, type Words } from "@/lib/i18n";
import { detectPlatform, PLATFORM_NAMES, type Platform } from "@/lib/platform";
import { useRelease } from "@/lib/release";
import { useTitle } from "@/lib/title";

type Text = Words<"home">;

function DownloadButton({ platform, t }: { platform: Platform | null; t: Text }) {
  const f = useFormat();
  const release = useRelease();
  const file = platform && release.status === "ready" ? release.release.files[platform] : undefined;
  const label = platform ? t("downloadFor", { system: PLATFORM_NAMES[platform] }) : t("download");
  if (file && release.status === "ready") {
    return (
      <span className="flex flex-col items-center gap-1.5">
        <a href={file.url} className="btn-primary">
          <Download aria-hidden size={20} />
          {label}
        </a>
        <span className="text-xs text-muted">{t("version", { version: release.release.version, size: f.size(file.size) })}</span>
      </span>
    );
  }
  return (
    <Link to="/download" className="btn-primary">
      <Download aria-hidden size={20} />
      {label}
    </Link>
  );
}

function OtherPlatforms({ platform, t }: { platform: Platform | null; t: Text }) {
  if (!platform) {
    return <>{t("allSystems")}</>;
  }
  const others = (Object.keys(PLATFORM_NAMES) as Platform[]).filter((other) => other !== platform);
  return (
    <>
      {t("alsoFor")}{" "}
      {others.map((other, index) => (
        <span key={other}>
          {index > 0 && t("and")}
          <Link to={`/download#${other}`} className="link">
            {PLATFORM_NAMES[other]}
          </Link>
        </span>
      ))}
    </>
  );
}

type Author = ScanPage | "failed" | null;

function useAuthor(): Author {
  const [page, setPage] = useState<Author>(null);
  useEffect(() => {
    const controller = new AbortController();
    api.player(String(AUTHOR.id), { offset: 0, limit: 1 }, controller.signal).then(
      (found) => setPage(found),
      () => {
        if (!controller.signal.aborted) {
          setPage("failed");
        }
      },
    );
    return () => controller.abort();
  }, []);
  return page;
}

function LiveBadge({ page, t }: { page: Author; t: Text }) {
  return (
    <Link
      to={`/u/${AUTHOR.id}`}
      aria-label={t("profileOf", { name: AUTHOR.name })}
      className="mx-auto block w-full max-w-xl rounded-2xl shadow-[0_18px_50px_rgba(0,0,0,0.55)] transition-transform duration-300 hover:-translate-y-1"
    >
      {page === null && <div className="aspect-[26/7] w-full animate-pulse rounded-2xl bg-card/70" />}
      {page === "failed" && (
        <img src="/images/share-badge.webp" width={1040} height={280} alt={t("sampleCard")} className="w-full rounded-2xl" />
      )}
      {page !== null && page !== "failed" && <ShareBadge page={page} />}
    </Link>
  );
}

export default function Home() {
  const t = useSection("home");
  useTitle();
  const author = useAuthor();
  const [platform] = useState(detectPlatform);
  const minimal = useAb().layout === "a";

  const program = (
    <Zoom src="/images/program-2x.webp" alt={t("window", { name: AUTHOR.name })}>
      <img
      src="/images/program.webp"
      srcSet="/images/program.webp 1480w, /images/program-2x.webp 2960w"
      sizes="(min-width: 1200px) 1152px, 100vw"
      width={1480}
      height={800}
      loading="lazy"
      alt={t("window", { name: AUTHOR.name })}
      className="w-full rounded-2xl border border-divider"
      />
    </Zoom>
  );

  return (
    <>
      <section className={`relative isolate overflow-hidden ${minimal ? "flex min-h-screen items-center" : ""}`}>
        <Art kind="hero" moving />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-bg/0 via-bg/30 to-bg" />
        <div className={`page-enter mx-auto w-full max-w-3xl px-4 text-center ${minimal ? "py-28" : "pb-16 pt-32 sm:pb-20 lg:pt-40"}`}>
          <h1 className="text-[2.6rem] leading-[1.05] text-hero sm:text-6xl">
            <span className="text-osu">osu!</span> Lost Scores
            <img src="/lemon.svg" alt="" width={56} height={56} className="ml-2 inline-block h-10 w-10 align-[-0.12em] sm:h-14 sm:w-14" />
          </h1>
          <p className="mt-5 text-xl font-medium text-lbl sm:text-2xl">
            {t.rich("tagline", { pp: (text) => <span className="text-osu">{text}</span> })}
          </p>
          <p className="mx-auto mt-3 max-w-xl text-hero-dim sm:text-lg">{t("intro")}</p>
          <div className="mt-8 flex flex-wrap items-start justify-center gap-3">
            <DownloadButton platform={platform} t={t} />
            <Link to="/rankings" className="btn-secondary">
              Hall of Copium
            </Link>
          </div>
          <p className="mt-4 text-sm text-muted">
            <OtherPlatforms platform={platform} t={t} /> · {t("free")}
          </p>
          {!minimal && (
            <div className="mt-10">
              <LiveBadge page={author} t={t} />
            </div>
          )}
        </div>
        {minimal && (
          <div className="absolute inset-x-0 bottom-6 flex justify-center">
            <a href="#how" aria-label={t("toHow")} className="animate-bounce text-muted hover:text-lbl">
              <ChevronDown aria-hidden size={28} />
            </a>
          </div>
        )}
      </section>

      <section id="how" className="mx-auto max-w-page scroll-mt-20 px-4 pb-6 pt-10 sm:px-6 sm:pt-14">
        <h2 className="text-3xl">{t("howTitle")}</h2>
        <p className="mt-1 text-muted">{t("howHint")}</p>
        <ol className="mt-6 grid gap-4 md:grid-cols-3">
          {t.raw<{ title: string; text: string }[]>("steps").map((step, index) => (
            <li key={step.title} className="rounded-2xl bg-card p-5 sm:p-6">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-btn font-semibold text-acc">{index + 1}</span>
              <h3 className="mt-3 text-xl">{step.title}</h3>
              <p className="mt-1 text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10">{program}</div>
        {minimal && (
          <div className="mt-10">
            <LiveBadge page={author} t={t} />
          </div>
        )}
      </section>
    </>
  );
}
