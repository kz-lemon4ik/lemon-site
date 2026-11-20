import { Suspense, useEffect } from "react";
import { Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import { lazyPage } from "@/lib/lazyPage";
import { startProgress } from "@/lib/progress";
import Home from "@/pages/Home";

const Download = lazyPage(() => import("@/pages/Download"));
const Rankings = lazyPage(() => import("@/pages/Rankings"));
const Profile = lazyPage(() => import("@/pages/Profile"));
const Faq = lazyPage(() => import("@/pages/Faq"));
const Privacy = lazyPage(() => import("@/pages/Legal"));
const Terms = lazyPage(() => import("@/pages/Legal").then((page) => ({ default: page.Terms })));
const LoginResult = lazyPage(() => import("@/pages/LoginResult"));
const NotFound = lazyPage(() => import("@/pages/NotFound"));
const Admin = lazyPage(() => import("@/pages/Admin"));

function OldProfile() {
  const { identifier = "" } = useParams();
  return <Navigate to={`/u/${encodeURIComponent(identifier)}`} replace />;
}

function RouteLoading() {
  useEffect(() => startProgress(), []);
  return <div className="min-h-screen" />;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ProgressBar />
      <ScrollToTop />
      <Header />
      <main className="flex flex-1 flex-col">
        <Suspense fallback={<RouteLoading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/download" element={<Download />} />
            <Route path="/rankings" element={<Rankings />} />
            <Route path="/rankings/plays" element={<Rankings />} />
            <Route path="/rankings/known" element={<Rankings />} />
            <Route path="/u/:id" element={<Profile />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/oauth/success" element={<LoginResult />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/hall-of-fame" element={<Navigate to="/rankings" replace />} />
            <Route path="/downloads" element={<Navigate to="/download" replace />} />
            <Route path="/installation" element={<Navigate to="/download" replace />} />
            <Route path="/about-program" element={<Navigate to="/" replace />} />
            <Route path="/how-it-works" element={<Navigate to="/" replace />} />
            <Route path="/feedback" element={<Navigate to="/faq" replace />} />
            <Route path="/profile/:identifier" element={<OldProfile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
