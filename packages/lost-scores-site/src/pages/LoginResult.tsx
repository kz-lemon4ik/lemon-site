import { CircleCheck, CircleX, User } from "lucide-react";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Consent from "@/components/Consent";
import { FullArt } from "@/components/Layout";
import { LOGIN_URL } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { takePage } from "@/lib/back";
import { useSection, type Words } from "@/lib/i18n";
import { useTitle } from "@/lib/title";

type Text = Words<"login">;

const WAIT_S = 5;

function useCountdown(done: () => void): number {
  const [left, setLeft] = useState(WAIT_S);
  useEffect(() => {
    if (left <= 0) {
      done();
      return;
    }
    const timer = setTimeout(() => setLeft((value) => value - 1), 1000);
    return () => clearTimeout(timer);
  }, [left, done]);
  return left;
}

function Result({ ok, title, children }: { ok: boolean; title: string; children: ReactNode }) {
  return (
    <div className="result-pop mx-auto flex max-w-2xl flex-col items-center gap-6 px-4 text-center sm:gap-8">
      {ok ? <CircleCheck aria-hidden className="h-20 w-20 text-up" strokeWidth={2} /> : <CircleX aria-hidden className="h-20 w-20 text-lost" strokeWidth={2} />}
      <h1 className="text-4xl text-hero sm:text-5xl">{title}</h1>
      <div className="flex w-full max-w-md flex-col items-center gap-4">{children}</div>
    </div>
  );
}

function Welcome({ name, id, t }: { name: string; id: string; t: Text }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="flex items-center gap-3">
      {/^\d+$/.test(id) && !failed ? (
        <img src={`https://a.ppy.sh/${id}`} alt="" onError={() => setFailed(true)} className="h-12 w-12 rounded-full border-2 border-link object-cover" />
      ) : (
        <span className="grid h-12 w-12 place-items-center rounded-full border-2 border-link bg-acc/20">
          <User aria-hidden className="h-6 w-6 text-link" />
        </span>
      )}
      <div className="text-left">
        <p className="text-lg font-semibold text-hero">{t("welcome", { name })}</p>
        <p className="text-sm text-hero-dim">ID: {id}</p>
      </div>
    </div>
  );
}

export default function LoginResult() {
  const t = useSection("login");
  const [params] = useSearchParams();
  const error = params.get("error");
  const source = params.get("source");
  const username = params.get("username") ?? "";
  const userId = params.get("user_id") ?? "";
  const { me, ready, refresh } = useAuth();
  const already = (Boolean(error) || !username) && me !== null && source !== "desktop";
  const failed = (Boolean(error) || !username) && !already;
  const navigate = useNavigate();
  const [stayed, setStayed] = useState(false);
  const [back] = useState(takePage);
  useTitle(failed ? t("failedPage") : t("okPage"));

  useEffect(() => {
    if (!failed && source === "web") {
      refresh();
    }
  }, [failed, source, refresh]);

  const finish = useCallback(() => {
    if (already) {
      navigate(back ?? `/u/${me.id}`);
    } else if (failed) {
      navigate("/");
    } else if (source === "desktop") {
      window.close();
      setTimeout(() => setStayed(true), 200);
    } else if (back) {
      navigate(back);
    } else if (/^\d+$/.test(userId)) {
      navigate(`/u/${userId}`);
    } else {
      navigate("/");
    }
  }, [already, me, failed, source, userId, navigate, back]);
  const left = useCountdown(finish);

  if ((Boolean(error) || !username) && !ready) {
    return <FullArt>{null}</FullArt>;
  }

  if (already) {
    return (
      <FullArt>
        <Result ok title={t("alreadyTitle")}>
          <Welcome name={me.username} id={String(me.id)} t={t} />
          <p className="text-hero-dim">{t("already")}</p>
          <p className="text-sm text-muted">{back ? t("toBack", { left }) : t("toProfile", { left })}</p>
        </Result>
      </FullArt>
    );
  }

  if (failed) {
    return (
      <FullArt>
        <Result ok={false} title={t("failedTitle")}>
          <p className="text-hero-dim">
            {(error && t.raw<Record<string, string>>("errors")[error]) || t("unknownError")} {t("tryAgain")}
          </p>
          <p className="text-sm text-muted">{t("fromProgram")}</p>
          <a href={LOGIN_URL} className="btn-login w-full py-3 text-base">
            {t("logIn")}
          </a>
          <Consent />
          <p className="text-sm text-muted">{t("toHome", { left })}</p>
        </Result>
      </FullArt>
    );
  }

  if (source === "desktop") {
    return (
      <FullArt>
        <Result ok title={t("okTitle")}>
          <Welcome name={username} id={userId} t={t} />
          <p className="text-hero-dim">{t("desktop")}</p>
          <p className="text-sm text-muted">
            {t("desktopNote")}{" "}
            <Link to="/privacy" className="link">
              {t("privacy")}
            </Link>
          </p>
          <p className="text-sm text-muted">{stayed ? t("stayed") : t("closing", { left })}</p>
        </Result>
      </FullArt>
    );
  }

  return (
    <FullArt>
      <Result ok title={t("okTitle")}>
        <Welcome name={username} id={userId} t={t} />
        <p className="text-hero-dim">{t("web")}</p>
        <div className="flex w-full gap-3">
          {/^\d+$/.test(userId) && (
            <Link to={`/u/${userId}`} className="btn-login flex-1 py-3 text-base">
              {t("myProfile")}
            </Link>
          )}
          <Link to="/rankings" className="btn-secondary flex-1 py-3 text-base">
            Hall of Copium
          </Link>
        </div>
        <p className="text-sm text-muted">{back ? t("toBack", { left }) : t("toProfile", { left })}</p>
      </Result>
    </FullArt>
  );
}
