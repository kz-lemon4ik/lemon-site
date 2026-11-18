import { lazy, Suspense, useEffect } from "react";
import { Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import AbPanel from "@/components/AbPanel";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import { startProgress } from "@/lib/progress";
import Home from "@/pages/Home";

const Download = lazy(() => import("@/pages/Download"));
const Rankings = lazy(() => import("@/pages/Rankings"));
const Profile = lazy(() => import("@/pages/Profile"));
const Faq = lazy(() => import("@/pages/Faq"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const LoginResult = lazy(() => import("@/pages/LoginResult"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Admin = lazy(() => import("@/pages/Admin"));

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
      <AbPanel />
    </div>
  );
}
