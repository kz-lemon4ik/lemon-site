import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "@/App";
import AbProvider from "@/components/AbProvider";
import AuthProvider from "@/components/AuthProvider";
import LangProvider from "@/components/LangProvider";
import MotionProvider from "@/components/MotionProvider";
import ThemeProvider from "@/components/ThemeProvider";
import { loadDict, savedLang } from "@/lib/i18n";
import { applyTheme, savedTheme } from "@/lib/theme";
import "@/index.css";

applyTheme(savedTheme());

const root = document.getElementById("root");
const lang = savedLang();

void loadDict(lang).then((dict) => {
  if (!root) {
    return;
  }
  createRoot(root).render(
    <StrictMode>
      <BrowserRouter>
        <AbProvider>
          <ThemeProvider>
            <LangProvider initial={{ id: lang, dict }}>
              <MotionProvider>
                <AuthProvider>
                  <App />
                </AuthProvider>
              </MotionProvider>
            </LangProvider>
          </ThemeProvider>
        </AbProvider>
      </BrowserRouter>
    </StrictMode>,
  );
});
