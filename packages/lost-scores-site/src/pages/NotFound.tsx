import { Link } from "react-router-dom";
import { FullArt } from "@/components/Layout";
import { useSection } from "@/lib/i18n";
import { useTitle } from "@/lib/title";

export default function NotFound() {
  const t = useSection("notFound");
  useTitle(t("title"));
  return (
    <FullArt>
      <div className="mx-auto max-w-lg rounded-2xl bg-card/95 px-6 py-12 text-center shadow-2xl sm:px-10">
        <img src="/lemon.svg" alt="" width={84} height={84} className="mx-auto h-20 w-20 -rotate-12" />
        <p className="mt-6 text-6xl font-semibold text-lbl">404</p>
        <h1 className="mt-3 text-2xl">{t("heading")}</h1>
        <p className="mt-2 text-muted">{t("text")}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn-small px-5 py-2.5 text-base">
            {t("home")}
          </Link>
          <Link to="/rankings" className="btn-small px-5 py-2.5 text-base">
            Hall of Copium
          </Link>
        </div>
      </div>
    </FullArt>
  );
}
