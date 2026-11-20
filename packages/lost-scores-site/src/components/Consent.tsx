import { Link } from "react-router-dom";
import { useSection } from "@/lib/i18n";

export default function Consent({ className = "" }: { className?: string }) {
  const t = useSection("login");
  return (
    <p className={`text-xs text-meta ${className}`}>
      {t.rich("consent", {
        terms: (text) => (
          <Link to="/terms" className="link">
            {text}
          </Link>
        ),
        privacy: (text) => (
          <Link to="/privacy" className="link">
            {text}
          </Link>
        ),
      })}
    </p>
  );
}
